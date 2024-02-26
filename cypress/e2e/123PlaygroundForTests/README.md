# 123 Playground

This has not been committed by mistake. No tests should be in here in the latest branch if they are, remove them immediately. No exceptions.

## Why this exists

This is a testing playground which is named to also run locally when unignored. It is ignored by default by logic in the cypress.json at the root of this repo.

This is named this way to always run first when cypress tests a run. It also directly mimicks the structure of our [pages tests](./pages) and must be kept up to date with them.

Engineers probably won't need this playground, but feel free to use it if you prefer to, it's an incubator. But tests must move from here before a PR is merged.

## How to use this

To use it remove the ignore from that the cypress.json at the root of this repo, remember to put it back before you merge! Then put the page type you want to test in the index.js file and start writing your tests. There isn't a different command for running tests, and there is no different logic that runs for these tests - this absolute consistency is deliberate.

If you want to you can also delete the tests that run for every page, but you'll then need remove all references to them. They don't take very long to run, so this is not advisable.
