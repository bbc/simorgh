# Dependabot in Simorgh

## Overview
We use the free dependency update tool [Dependabot](https://github.com/dependabot) to help manage our dependency updates. This document explains our configuration choices to aid understanding and guide future decisions. We use dependabot because it has configurable grouping of dependency updates allowing us to choose what updates we can safely treat as a grouped PR and which require greater scrutiny and merit their own dedicated PR. Additionally PRs are automatically kept up-to-date in the background as new releases are pushed to npm and other PRs are merged into Simorgh.

## Base Config
[Our config](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L1) applies a lot of sensible defaults to how it manages dependencies including:
- Seperating major dependency bumps into their own dedicated PRs
- Grouping of common monorepos into their own PRs, e.g. Storybook

We also choose to [only enable dependabot for `npm` packages](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L3), it supports many dependency types including github actions and `nvm` to keep our version of node up-to-date, but at this stage we chose to stick to `npm` packages and do other dependencies manually.

## Group All 3rd Party Non-Major Deps

We chose to group minor and patch dependencies together as these _should_ not have any breaking changes, please see https://semver.org/ for expectations of minor and patch upgrades. These PRs should be safe merge once we have:
- Looked through the release notes [on the PR](https://github.com/bbc/simorgh/pull/8787) to see if any changes sound like they could be breaking; semver is sometimes interpreted differently so it is worth looking for anything that could cause issues in Simorgh. 
  - If this is the case, we can make a call and decide to either merge the PR, or whether to put the PR onto the Simorgh Test or Preview environment, and carry out more extensive checks manually 
- Ensured all CI checks have passed


## Group Webpack and Loadable

We chose to group all minor and patch updates for [loadable](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L37-L39) and [webpack](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L40-L43) as these are core dependencies for Simorgh so should be scrutinised separately. 


## Group BBC Non-Major Deps

We chose to [group updates to BBC packages](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L14-L19) into one PR for minor and patch updates. Major package updates will generate seperate PRs as you would expect allowing you to bring them in seperately for the feature/breaking change you are introducing. 


## Ignored Dependencies

Sometimes we are unable to upgrade to the latest version of a dependency, due to breaking changes, or lack of browser support. These dependencies can be [ignored](https://github.com/bbc/simorgh/blob/c17b20ef183e8bc94afb66d2414bc7e5ac14a845/.github/dependabot.yml#L14-L19), so that dependabot will not create PRs for these packages.
