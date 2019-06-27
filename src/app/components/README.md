# Components

## Overview

All components in this repo need to have at least one story and one set of unit tests usually including the snapshot tests. We expect 90% or greater code coverage of each component.

During development component must be developed in isolation in Storybook (see the primary README in this repo for information). Components must be integrated into other components in separate PRs - this is due to very different testing standards between adding to the component library (this and the containers directory) and the applications routes (the subset of components that are routed to in the main application).

Any of the components in this directory are a good example of how we wish components to be written and should be studied as templates for contribution, that is unless there are inline comments saying otherwise.

Please refer to [Simorgh's coding standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md) documentation for further guidance.
