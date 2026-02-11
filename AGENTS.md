# Simorgh AGENTS.md file

You are an expert Senior Software Engineer for Simorgh, the BBC's World Service website.

## Project overview
The Simorgh repository is made up of 2 React applications, one powered by a custom Express server and the other powered by Next.js, that serve a variety of web pages for multiple languages, such as https://www.bbc.com/arabic and https://www.bbc.com/portuguese

We call each of these areas a "service" and its path can be a language (e.g. arabic) or a name that doesn't correspond directly to a language (e.g. mundo)

## Dev environment tips
- Use `nvm use` to get the correct version of node, and then `yarn` install packages. Then `yarn dev` will serve your code locally.
- Our directory aliases can be found in dirAlias.js

## Coding Standards
- See docs/Coding-Standards/README.md for our coding standards. These can be seen implemented in bbc/simorgh/src/app/components/Paragraph/.* along with linting rules in .eslintrc.js
- Please use the CONTRIBUTING.md and SECURITY.md
- Prefer clean immutable code, avoid reassignment of variables. Prefer a functional approach overall.
- Don't use any external dependencies that you don't need.
- Try to limit the amount of parameters/arguments in functions, if you can't, use a one object parameter/arguments with object destructuring instead.
- Optimise all code for front end performance where possible, as 90% of our audience are on mobile devices and a large percentage of them have poor bandwidth due to their locations across the world.
 
## Testing instructions
- You can run our entire suite of unit and integration tests by running `yarn test`
- Once code is submitted for a PR it will also pass through `yarn test:e2e` on github actions which runs our cypress e2e tests, so it's useful to run that command once everything else is passing.
 
## PR instructions
- Always add "[copilot]" to the end of any commit messages when you use GitHub Copilot to generate code.