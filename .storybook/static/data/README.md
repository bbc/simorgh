# Storybook fixture data

## Routing

This files in directory (./storybook/static/data) are hosted on storybook application via the relative path of file from data directory. For example, `.storybook/static/data/russian/mostRead/index.json` will be available here: `https://bbc.github.io/simorgh/russian/mostread.json`.

## Reasoning for directory convention

Some of our components are fetching data on the client side, therefore we need to ensure there is data available on the storybook app with the same route path as the Simorgh app.
