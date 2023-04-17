import fs from "fs";
import path from "path";
import { promisify } from "util";

import Listr from "listr";
import chalk from "chalk";
import ncp from "ncp";
import { projectInstall } from "pkg-install";

export async function createBoilerplate(opts) {
  const TEMPLATE_DIR = path.join("templates", opts.template);

  const runningTask = new Listr([
    {
      title: "Copiando os arquivos do projeto...",
      task: async () => {
        try {
          const copy = promisify(ncp);

          if (opts.dir) {
            fs.mkdirSync(opts.dir, { recursive: true });
          }

          await copy(TEMPLATE_DIR, opts.dir);

          const filePath = path.resolve(opts.dir, "package.json");

          if (fs.existsSync(filePath)) {
            const fileObj = require(filePath);
            fileObj.name = opts.name;

            fs.writeFile(filePath, JSON.stringify(fileObj, null, 2), (err) => {
              if (err) throw err;
            });
          }
        } catch (err) {
          console.error(chalk.red("Falha ao copiar os arquivos do projeto."));

          console.error(chalk.yellow(err));

          process.exit(1);
        }
      },
    },
    {
      title: "Instalando dependências...",
      task: async () => {
        try {
          await projectInstall({
            cwd: opts.dir,
          });
        } catch (err) {
          console.error(
            chalk.red("Falha ao instalar as dependências do projeto.")
          );

          console.error(chalk.yellow(err));

          process.exit(1);
        }
      },
      enabled: () => opts.install,
    },
  ]);

  await runningTask.run();

  console.log(
    chalk.green(`Projeto criado com base no template ${opts.template}!!`)
  );

  if (opts.dir) {
    console.log(
      chalk.green(`Acesse seu projeto usando o comando "cd ${opts.dir}".`)
    );
  }

  return true;
}
