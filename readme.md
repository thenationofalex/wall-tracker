## ⛰️ Wall Tracker

![](https://www.thenationofalex.com/static/wall-0.png)

#### 🔨 Built with

- [Lerna](https://github.com/lerna/lerna)
- [Husky](https://github.com/typicode/husky)

#### 🏗️ Setup

- Install lerna `npm i`
- Install all modules with Lerna `lerna bootstrap`
- Serverless is required for the API deployments
- MongoDB is required
- Each package has its own `.env` for configuration

#### 🏢 Structure

- `packages/api` GraphQL Api
- `packages/app` React Native Application

### 🔀 Git workflow

- Commit messages must follow the [conventional commit structure](https://conventionalcommits.org/) - `<type>(<scope>): <subject>`
	- E.g: `git commit -m 'docs(api): Updating readme'`
- Acceptable commit types are:

Type       | Purpose
:--------- | ------------------------------
`chore`    | Updating tasks etc; maintenance, no production code change
`docs`     | Updating documentation
`feat`     | A commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning)
`fix`      | A commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning)
`perf`     | Making things faster *Whoosh!*
`refactor` | Refactor existing code
`revert`   | Revert back to an older commit.
`style`    | Formatting, missing semi colons, …
`test`     | Add new or updating tests

#### 📖 Commands

Command                | Purpose
:--------------------- | :----------------------------------------------
`lerna bootstrap`      | Install all packages node modules
`lerna link`           | Link NPM deps
`lerna clean`          | Clean all package installs
