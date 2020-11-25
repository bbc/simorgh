# JavaScript Bundling

Because we make multiple releases per day with updated application and library (node_module) code we split our client-side JavaScript bundle into multiple chunks to improve cache efficiency so that the amount of cache-invalidated chunks after each deployment is kept to a minimum.

### Our strategy

Currently, our chunking strategy is as follows:

- **A minimal chunk for each service**

  This includes a chunk for service specific config, translations and moment locales.

- **A minimal commons chunk for each page type**

  This includes only code used across all page types so our pages share a chunk that doesn't contain any unnecessary code.

- **A framework chunk**

  A chunk for `react` and `react-dom`. By isolating the framework code we ensure that it will not be cache-invalidated by irrelevant changes made to application code.

- **Library chunks for any large node_module dependencies**

  A chunk each for any large libraries such as `moment` to avoid potential cache invalidations made by changes made to application code.

- **Shared chunks**

  As many shared chunks (used by 2 or more pages) as possible, optimising for overall application size and initial load speed.

This strategy was mostly inspired by the Next.js and Gatsby approach detailed [here](https://web.dev/granular-chunking-nextjs/).

### Webpack

We use Webpack to configure our client-side JavaScript bundling strategy. The client-side Webpack config can be found [here](https://github.com/bbc/simorgh/blob/latest/webpack.config.client.js) and the bundling strategy described above is defined in the `splitChunks` object.

### Loadable

We use `@loadable/component` to code-split service specific and page type code into separate chunks that are loaded only in the corresponding service and page type. `@loadable/component` integrates with Webpack. To ensure the commons chunk is configured properly we need to define the number of page types we have in Webpack's `splitChunks.commons.minChunks` configuration.

### Total bundles sizes for each page type and service

We use a custom script to output the total JavaScript bundle size for each service and page type after every build. You can view this information in your terminal after running `npm run build`.
