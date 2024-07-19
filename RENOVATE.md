# Renovate in Simorgh

## Overview
We use the free dependency update tool [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) to help manage our dependency updates. This document explains our configuration choices to aid understanding and guide future decisions. We use renovate rather than dependabot primarily because it has configurable grouping of dependency updates allowing us to choose what updates we can safely treat as a grouped PR and which require greater scrutiny and merit their own dedicated PR. Additionally PRs are automatically kept up-to-date in the background as new releases are pushed to npm and other PRs are merged into Simorgh.

## Base Config
[Our config](
https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L2) is based off renovate's [base config](https://docs.renovatebot.com/presets-config/), this applies a lot of sensible defaults to how it manages dependencies including:
- Seperating major dependency bumps into their own dedicated PRs
- Grouping of common monorepos into their own PRs, e.g. Storybook

We also choose to [only enable renovate](https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L3) for npm packages, it supports many dependency types include github actions and nvm to keep our version of node up-to-date but at this stage we chose to stick to npm packages and do other dependencies manually.

## Pinning Dependencies
We have configured renovate to [pin dependencies](https://github.com/bbc/simorgh/blob/09dbe8614cb6931765f2ddc61299d1fa2bbb6564/renovate.json#L2) based on their guidance on the subject [here](https://docs.renovatebot.com/dependency-pinning/#so-whats-best).

## Group All 3rd Party Non-Major Deps
https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L6..L10

We chose to group minor and patch dependencies together as these _should_ not have any breaking changes, please see https://semver.org/ for expectations of minor and patch upgrades. These PRs should be safe merge once we have:
- Looked through the release notes [on the PR](https://github.com/bbc/simorgh/pull/8787) to see if any changes sound like they could be breaking; semver is sometimes 
interpreted differently so it is worth looking for anything that could cause issues in Simorgh.
- Ensured all CI checks have passed

## Group Webpack and Loadable
We chose to group all minor and patch updates for [loadable](https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L13) and [webpack](https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L19) as these are core dependencies for Simorgh so should be scrutinised seperately. 
In [this PR](https://github.com/bbc/simorgh/pull/8774) upgrading loadable caused an issue in Simorgh and required a manual fix to correct it.

## Group BBC (mostly psammead) Non-Major Deps
We chose to [group updates to BBC packages](https://github.com/bbc/simorgh/blob/bf3961e69a98f42410a80622bd9e9855f1145ed1/renovate.json#L25) into one PR for minor and patch updates. We made this choice as we should update psammead packages following semver rules and it should be safe to integrate psammead packages in one PR for minor and patch updates. Major package updates will generate seperate PRs as you would expect allowing you to bring them in seperately for the feature/breaking change you are introducing. It should be noted that you are very welcome to bring in psammead upgrades; minor, patch or major, in other PRs related to features being worked on, renovate will update the grouped PR accordingly as dependencies are updated in other PRs and merged into latest.

