This folder contains code that we want to replace using the strangler pattern.

The plan is to incrementally write new components that follow standards and best practices to replace the legacy components contained in this directory.

The new components will be contained in /src/app/components.

Psammead components used to be maintained as a seperate component library.

Components and Containers were an attempt to follow the container-component pattern which is a pattern we have agreed not to follow anymore.

We still have component, we have agreed to move our pages to the components directory:
/src/app/pages -> /src/app/components/pages
