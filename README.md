# FSDT Boilerplates

Boilerplates to help new projects development.

## Command

`npx fsdt-boilerplates@latest`

## Arguments

`--name=[name]`

Skip CLI input to project name.

---

`--dir=[dir]`

Skip CLI input to installation directory.

---

`--template=[template]`

Skip CLI input to project framework.

OBS: Use the exact name as displayed on prompt without this argument, like `NextJS, React, Angular`. If we have this boilerplate, the installation will proceed, otherwise will ask you to chose one available.

---

`--install`

Force packages instalation.

---

`--noInstall`

Don't run packages instalation.

---

`--help`

Show CLI documentation(WIP).

## Creating new templates

Ensure what you creation has all of this critereas:

- Name of package follow this base `fsdt-boilerplates-[name]`
  - Remember run `npm install` after change to modify `package-lock.json` to.
- Version of package need to be `1.0.0`;
- Typescript (if has possible);
- Formatters and Code-qualiters libraries;
- Tests;
- Simple structure what reproduce the renderization;
- README.md file with description about the framework, basic installation and running instructions.
