# src directory

Everything that will be deployed in production should be in this or the [/public directory](../public/). The latter being the location for the static files.

This does not mean everything in this directory is deployed in production. For example the [Storybook](https://storybook.js.org/) stories and tests are stripped out, but kept here for better Developer eXperience (DX) as colocated files are easier to understand and maintain.

Understanding the content of this directory may take some time, we've tried to explain how the application and server work in the [application overview](https://github.com/bbc/simorgh#simorgh-overview). We welcome suggestions and [contributions](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md) for improving this explanation.
