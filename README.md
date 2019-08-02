# Simorgh

[![Build Status](https://travis-ci.org/bbc/simorgh.svg?branch=latest)](https://travis-ci.org/bbc/simorgh) [![Test Coverage](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/test_coverage)](https://codeclimate.com/github/bbc/simorgh/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/bbc/simorgh/badge.svg)](https://snyk.io/test/github/bbc/simorgh) [![Maintainability](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/maintainability)](https://codeclimate.com/github/bbc/simorgh/maintainability) [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://bbc.github.io/simorgh/)

The BBC websites are being rebuilt from the bottom up as ReactJS based Single Page Applications, that will (eventually) also be fully fledged Progressive Web Apps. This application also builds Accelerated Mobile Pages for every regular HTML page that it renders.

Simorgh will be used across the BBC World Service News websites ([some are already live](https://github.com/bbc/simorgh/wiki/Simorgh-Pages)), with tens of millions of users, and growing very fast.

We lean heavily on the component library called [Psammead](https://github.com/bbc/psammead/) that we also maintain. This library is also open source and used even more widely across the BBC.

## Documentation index
Please familiarise yourself with our:
- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md) (you are here)

## Simorgh Overview
### A High Level User Journey

#### The initial page load - Server Side Render (SSR)

A request to a BBC article (https://www.bbc.co.uk/news/articles/clldg965yzjo) is passed on to the Simorgh application from a proprietary routing and caching service (called Mozart).

The request matches a route in our express server using a regex match (`articleRegexPath` || `frontPageRegexPath`). If the URL matches the pre-defined regex pattern for an article or a front page we fetch some params from the route using the `getRouteProps` function. This returns the service, isAmp, route and match. Route is a react-router route that defines a method to fetch the initial JSON used to render the page and the react container in which to render i.e. `ArticleContainer`, this is typically called `getInitialData`

Once data is returned we pull the status code and pass all of this data as props to our main document using `renderDocument`.

The Document passes the URL, JSON data, BBC Origin, isAmp and the service to the main App container and the result is rendered to a string using reacts own `renderToString` method. This string is then passed to DocumentComponent as the main app along with the assets array, style tags (the output from styled components) and any scripts/links that need to be added to the head. This is then rendered to static HTML markup using reacts own `renderToStaticMarkup` and sent back to the user as static HTML. Included in this response are links to our JS bundles which a users device will download to bootstrap the single page application (SPA) for subsequent journeys.

Now that the raw HTML has been downloaded, the client-side JS file kicks in and hydrates the initial response with the client side application. During this process react uses the initial JSON payload (available on the global window object `SIMORGH_DATA`) to hydrate the original markup returned by ReactDOMServer. React expects that the rendered content is identical between the server and the client (This is why we send the initial JSON payload with the SSR page, so the hydration phase runs with the same data that the server render used).

#### Onward Journeys - Client Side Render (CSR)

Now that the SPA is bootstrapped on the users device, onward journeys to further Simorgh pages are captured by react-router and rendered on entirely on the client.

Clicking on an onward journey triggers the `useEffect` hook in the main App container as the URL path has changed. This effect uses `getRouteProps` again to match the new path against a react-router route, gaining access to the; service and isAmp props, the react container to render and the `getInitialData` function.

The local state is now updated, setting `loading` to `true` and `data` to `null`. This update to state triggers the App container to re-render passing the state values as props to the main container, in this case either ArticlesContainer or FrontPageContainer. These containers compose a set of higher order components (HOC) and each one handles the values from a given props. Currently the loading prop is set to `true` so the `withLoading` HOC will return the loading component showing a visual loading state to the user.

During this time the App container has finished fetching the JSON payload for the onward journey and the state is updated again. Loading is now set to false and data is set to the returned JSON data.

The routes container is rendered again, this time loading is set to false so the `withData` HOC can run some validation against the JSON payload and return either an error component or the original page container e.g. ArticleContainer passing in the JSON data with the pageData prop.

### Rendering a Page

The JSON payload for an article consists of a number of Blocks. Each block is an object which represents an element on the page, this could be a Heading, an Image, a Paragraph etc. Each of these blocks has a block type and a block type will match up to a specific container in Simorgh e.g. blockType: image will match to the Image container.

The ArticleMain container will iterate over each JSON block, match it against its corresponding react container and pass the data via props. These containers are where the logic for rendering each block type sits. It is at this point where we use the installed frontend components from the Psammead component library. For example the Image container will import the Figure container, and Figure will import and use the psammead-image and the psammead-image-placeholder components. An image on an article will generally have a caption, so the Figure container will import the caption container which may include more frontend components from Psammead to render a caption on top of the image.

This process is repeated for each block within an article, ultimately rendering the main body of a news article using a combination of React containers for the business logic and React components for the frontend markup.

### A Page Render Lifecycle

Each render is passed through a set of HOC's to enhance the page, these HOC's are;

- withContexts
- withPageWrapper
- withLoading
- withError
- withData

#### withContexts
The withContexts HOC is a wrapper that provides access to the different context providers available in the application. Any child component inside of these context providers has access to the context data via the useContexts hook.

#### withPageWrapper

The page wrapper HOC simply wraps the Article or FrontPage containers with a layout, at present we only have a single page layout. This layout includes the header, footer and context providers rendering the main body as a child between the header and the footer.

#### withLoading

The loading HOC checks the value of the loading props, if it is false the Article or FrontPage container is simply returned.

If loading is set to true, the Loading component is returned instead rendering a visual loading view for the user.

#### withError

The error HOC checks the error prop passed in, if error is set to null the Article or FrontPage container is simply returned.

If error is set to true the Error component is returned, giving the user a visual indication of the error e.g. a 500 error page.

#### withData

Assuming the other HOC's have returned the original Article or FrontPage container the data HOC will run some validation checks on the JSON data passed in via the data prop. If all of the checks are satisfied the ArticleContainer will be returned with a single `pageData` prop. This pageData props will house the JSON data to be rendered e.g. the Optimo blocks for a given article.


## Before Installation
Please read:
CONTRIBUTING.md
## Installation

Install Node. [https://nodejs.org/en/](https://nodejs.org/en/). We use the version specified in `.nvmrc` and if you have a node version manager (nvm) you can run the following script to automatically change to the project supported version.

```
nvm use
```

Then you can run the following commands to install Simorgh

```
git clone git@github.com:bbc/simorgh.git
cd simorgh
npm install
```

## Local Development

To run this application locally, with hot-reloading, run

```
npm run dev
```

The application will start on [http://localhost.bbc.com:7080](http://localhost.bbc.com:7080). 

### Article pages

Article pages are served at routes of the format `/news/articles/:id` where id is the asset ID generated by the Content Management System.

FYI: [Article explaining the BBC's use of ids in URL](https://www.smashingmagazine.com/2014/05/responsive-design-begins-with-the-url/)

These two News articles are available on the Test environment of our CMS, as well as locally, so are often used for testing:

- [http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po](http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po)
- [http://localhost.bbc.com:7080/persian/articles/c4vlle3q337o](http://localhost.bbc.com:7080/persian/articles/c4vlle3q337o).

We are also serving AMP HTML pages at the route `/news/articles/:id.amp` [https://www.ampproject.org](https://www.ampproject.org)

- [http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po.amp](http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po.amp)
- [http://localhost.bbc.com:7080/persian/articles/c4vlle3q337o.amp](http://localhost.bbc.com:7080/persian/articles/c4vlle3q337o.amp).

### Front pages

World Service front pages are served in the format `/:service` where `service` represents a World Service site:

- [http://localhost.bbc.com:7080/igbo](http://localhost.bbc.com:7080/igbo)
- [http://localhost.bbc.com:7080/pidgin](http://localhost.bbc.com:7080/pidgin)

The World Service front pages follow the article format for AMP too, being available at `/:service.amp`:

- [http://localhost.bbc.com:7080/igbo.amp](http://localhost.bbc.com:7080/igbo.amp)
- [http://localhost.bbc.com:7080/pidgin.amp](http://localhost.bbc.com:7080/pidgin.amp)

### Other page types
You can find other pages types by looking through our routes and their associates regexes, but we suggest you start with the above then have a look at the core of the application to understand and find the other routes.

### Storybook (UI Development Environment/Style Guide)

We use Storybook for developing components in isolation from the Simorgh Application. You can access this at [https://bbc.github.io/simorgh/](https://bbc.github.io/simorgh/)

To run locally `npm run storybook`, it will then be available at [http://localhost.bbc.com:9001/](http://localhost.bbc.com:9001/). Introduction to and documentation for Storybook is here: [https://storybook.js.org/basics/introduction/](https://storybook.js.org/basics/introduction/).

When viewing Video stories locally, make sure to use a BBC domain, as outlined in the [changing request location section](https://github.com/bbc/simorgh#changing-request-location). Video will not work in the hosted version of Storybook linked above for this reason.

We also use [Chromatic QA](https://docs.chromaticqa.com/) to run cross-browser testing on our stories.

## Production build locally

To run this application locally with a production build, run:
`npm run build && npm run start`.

We use `npm run build` locally which bundles the application pointing at localhost for data and static assets.

## Using environment builds locally

This is mainly used for debugging `latest` using the TEST and LIVE environment bundles. Ensure that the bundles exist in the static asset location for the correct environment before starting to debug.

To run TEST bundles on localhost:

- In `envConfig/test.env` change the values of:
  - `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
  - `COSMOS_DIALS_PATH='/etc/cosmos-dials/dials.json'` to `COSMOS_DIALS_PATH='dials.json'`
- Then run `rm -rf build && npm run build:test && npm run start`
- Visit a test article: http://localhost.bbc.com:7080/news/articles/c0g992jmmkko

To run LIVE bundles on localhost:

- In `envConfig/live.env` change the values of:
  - `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
  - `COSMOS_DIALS_PATH='/etc/cosmos-dials/dials.json'` to `COSMOS_DIALS_PATH='dials.json'`
- Then run `rm -rf build && npm run build:live && npm run start`
- Visit a live article: http://localhost.bbc.com:7080/news/articles/c8xxl4l3dzeo

If these urls do not work, you may need to add a hosts file entry (`/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts`):

```
127.0.0.1 localhost.bbc.co.uk
127.0.0.1 localhost.bbc.com
```

## Changing request location

Some features perform differently dependant on whether a user is located within the UK or internationally. You can explicitly request a specific version by accessing Simorgh via a specific localhost BBC domain:

- UK version: [http://localhost.bbc.co.uk:7080/news/articles/c0000000001o](http://localhost.bbc.co.uk:7080/news/articles/c0000000001o)
- International version: [http://localhost.bbc.com:7080/news/articles/c0000000001o](http://localhost.bbc.com:7080/news/articles/c0000000001o)

## Production build on CI

On deployment `npm run build:ci` is run in the CI environment which creates bundles for both the `test` and `live` environments. On the two environments the `.env.test` or `.env.live` files overwrite the `.env` file which is used to run the application with the correct bundles.

### Bundle analysis reports

Every run of `npm run build` will update the bundle analysis files in the repo. To view a breakdown of the bundle size, open the generated html report in a browser `./reports/webpackBundleReport.html` This is generated via `webpack-bundle-analyzer`. The data is also available as json `./reports/webpackBundleReport.json`.

## Tests

### Linting and unit tests

We have linting with the [Airbnb styleguide](https://github.com/airbnb/javascript/tree/master/react) and we use [Prettier](https://github.com/prettier/prettier) as a code formatter. They can be run with `npm run test:lint`.

We have [Jest](https://facebook.github.io/jest) unit tests that can be run with `npm run test:unit`.

`npm test` runs both sets of these.

### End-to-end tests

#### Main application

We use [Cypress](https://www.cypress.io/) for our end-to-end tests. For running the tests locally, run this single command:

```
npm run test:e2e
```

It will spin up a production server on port 7080 and run the Cypress tests against that.

Further details on using the Cypress CLI can be found at https://docs.cypress.io/guides/guides/command-line.html

Cypress can be run interactively using `npm run test:e2e:interactive`. This loads a user interface which easily allows for indivdual tests to be run alongside a visual stream of the browser, as the tests run.

#### Running e2e in the UK against LIVE
**This affects developers based in the UK only (but may affect you if you're using a VPN routing through the UK)**

Cypress .visit() function is locked to visiting a single domain per test. This becomes problematic when you launch the e2e tests from within the UK, due to redirects from `.com` to `.co.uk`. By default cypress tests will run as if they were ran outside of the uk. In order to run these tests from the UK you have to pass in the `UK` Cypress environment variable to the tests. This will replace the URL endings to `.co.uk`, which will allow you to run these tests successfully.

Here is an example command:

```
CYPRESS_APP_ENV=test CYPRESS_UK=true npm run cypress:interactive
```

### Lighthouse Best Practice tests

We use [Lighthouse](https://github.com/googlechrome/lighthouse) to test the performance of our page. However these have been moved out of Simorgh down to our own internal CD processes. This allows us to run these tests on a more accurate depiction of Simorgh. You are free to run lighthouse on your own from your Chrome browser or use the Node Lighthouse CLI.

### Why is it called Simorgh?!

Named Simorgh after the Persian mythological bird. The Simorgh is the amalgam of many birds (and in some accounts other animals) into one.

Happily, a metaphor which seemed apt for offering all BBC articles in one solution is perhaps now even more appropriate as the application evolves to support more content types. It’s also a clear reference to the international nature of our teams, but also to the desire to ensure articles (and everything which has followed) works for users in all languages the BBC supports.

It is also a unique name which is practical and, more superficially, the bird is very pretty.
