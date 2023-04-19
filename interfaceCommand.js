import fs from "fs";
import path from "path";

import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";

import { createBoilerplate } from "./main.js";

function argumentOptionsParser(rawArguments) {
  const args = arg(
    {
      "--name": String,
      "--dir": String,
      "--template": String,
      "--install": Boolean,
      "--noInstall": Boolean,
      "--help": Boolean,
    },
    {
      argv: rawArguments.slice(2),
    }
  );

  return {
    name: args["--name"],
    dir: args["--dir"],
    template: args["--template"],
    install: args["--install"] || false,
    noInstall: args["--noInstall"] || false,
    help: args["--help"],
  };
}

async function getTemplatesList() {
  try {
    const list = fs.readdirSync(path.resolve(__dirname, "templates"));

    if (list.length === 0) {
      throw "NO_TEMPLATE";
    }

    return list;
  } catch (err) {
    if (err === "NO_TEMPLATE") {
      console.error(
        chalk.red("Não foi encontrado nenhum framework disponível no momento.")
      );
    } else {
      console.error(chalk.red("Falha ao buscar os frameworks disponíveis."));

      console.error(chalk.yellow(err));
    }

    process.exit(1);
  }
}

async function inquireUndeclaredItems(args, templatesList) {
  const displayOptions = [];

  if (!args.name) {
    displayOptions.push({
      type: "input",
      name: "name",
      message: "Digite o nome do seu projeto.",
      default: "my-app",
    });
  }

  if (!args.dir) {
    displayOptions.push({
      type: "input",
      name: "dir",
      message:
        "Digite o local de instalação do projeto. Deixe em branco caso queira instalar nesta mesma pasta.",
    });
  }

  if (
    !args.template ||
    (args.template &&
      !templatesList.find((template) => template === args.template))
  ) {
    displayOptions.push({
      type: "list",
      name: "template",
      message: "Qual modelo você está pensando em usar?",
      choices: templatesList,
    });
  }

  if (!args.install && !args.noInstall) {
    displayOptions.push({
      type: "confirm",
      name: "install",
      message: "Deseja instalar os pacotes necessários?",
      default: false,
    });
  }

  const userInput = await inquirer.prompt(displayOptions);

  const getTrulyArg = (arg, noArg, userInput) => {
    if (arg) {
      return true;
    } else if (noArg) {
      return false;
    }

    return userInput;
  };

  const getTemplateByInput = (input) => {
    return templatesList.find((template) => input && template === input);
  };

  return {
    name: args["name"] || userInput["name"],
    dir: args["dir"] || userInput["dir"],
    template:
      getTemplateByInput(args["template"]) ||
      getTemplateByInput(userInput["template"]),
    install: getTrulyArg(
      args["install"],
      args["noInstall"],
      userInput["install"]
    ),
  };
}

export async function interfaceCommand(args) {
  const parsedArgs = argumentOptionsParser(args);

  if (parsedArgs.help) {
    return console.log("HEEELLLPPP!!!");
  }

  const templatesList = await getTemplatesList();

  const opts = await inquireUndeclaredItems(parsedArgs, templatesList);

  await createBoilerplate(opts);
}
