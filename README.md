# Articles Renderer

## Installation

Install Node 8. [https://nodejs.org/en/](https://nodejs.org/en/)
Update to use the latest npm `npm i -g npm`

```
git clone git@github.com:bbc/articles-renderer.git
npm install
```

## Local Development

To run this application locally, with hot-reloading, run: `npm run dev`.

The application will start on [http://localhost:3000/](http://localhost:3000/). These is a single route, `/`.

To view a breakdown of the bundle size, open the generated html report in a browser `./articles-renderer/build/webpackBundleReport.html` This is generated via `webpack-bundle-analyzer`.

## Production build

To run this application locally with a production build, run:

1.  `npm run build`
2.  `npm run start`

## Tests

To run tests, run: `npm test`
