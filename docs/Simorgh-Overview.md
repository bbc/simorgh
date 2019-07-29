# Simorgh Mini Guide

Simorgh consists mainly of two repositories:

1. Simorgh https://github.com/bbc/simorgh/ - This is the repo that holds the core react application, the express server, Routes and the React containers.
2. Psammead https://github.com/bbc/psammead - Psammead is the Front end component library for Simorgh, this is a mono repo consisting of a number of packages focussed on the application frontend. Each package is published to NPM and available under the `@bbc/psammead-*` namespace and are installed and used inside of the Simorgh container.

## What is Simorgh

Simorgh is a universal/isomorphic JS Single page application, written with Node, express and React. Currently Simorgh is designed to render news articles from the BBC's new CMS; optimo. It is also used to render front pages for our WorldService sites.

Being universal JavaScript, a Simorgh page renders on both the server and the client. A users initial page load will be a server side render, for optimal performance and compatibility with devices not using JS. Onward journeys (clicking on inline Links to another page rendered by Simorgh) will then render client side, using the JS bundles downloaded during the original server side render. In this case a user is now only making a network request to fetch the JSON data and the page is rendered on the users device.

## A High Level User Journey

### The initial page load - Server Side Render (SSR)

A request to a BBC article (https://www.bbc.co.uk/news/articles/clldg965yzjo) is passed on to the Simorgh application from Mozart.

The request matches a route in our express server using a regex match (`articleRegexPath` || `frontPageRegexPath`). If the URL matches the pre-defined regex pattern for an article or a front page we fetch some params from the route using the `getRouteProps` function. This returns the service, isAmp, route and match. Route is a react-router route that defines a method to fetch the initial JSON used to render the page and the react container in which to render i.e. `ArticleContainer`, this is typically called `getInitialData`

Once data is returned we pull the status code and pass all of this data as props to our main document using `renderDocument`.

The Document passes the URL, JSON data, BBC Origin, isAmp and the service to the main App container and the result is rendered to a string using reacts own `renderToString` method. This string is then passed to DocumentComponent as the main app along with the assets array, style tags (the output from styled components) and any scripts/links that need to be added to the head. This is then rendered to static HTML markup using reacts own `renderToStaticMarkup` and sent back to the user as static HTML. Included in this response are links to our JS bundles which a users device will download to bootstrap the single page application (SPA) for subsequent journeys.

Now that the raw HTML has been downloaded, the client-side JS file kicks in and hydrates the initial response with the client side application. During this process react uses the initial JSON payload (available on the global window object `SIMORGH_DATA`) to hydrate the original markup returned by ReactDOMServer. React expects that the rendered content is identical between the server and the client (This is why we send the initial JSON payload with the SSR page, so the hydration phase runs with the same data that the server render used).

### Onward Journeys - Client Side Render (CSR)

Now that the SPA is bootstrapped on the users device, onward journeys to further Simorgh pages are captured by react-router and rendered on entirely on the client.

Clicking on an onward journey triggers the `useEffect` hook in the main App container as the URL path has changed. This effect uses `getRouteProps` again to match the new path against a react-router route, gaining access to the; service and isAmp props, the react container to render and the `getInitialData` function.

The local state is now updated setting `loading` to `true` and `data` to `null`. This update to state triggers the App container to re-render passing the state values as props to the main container, in this case either ArticlesContainer or FrontPageContainer. These containers compose a set of higher order components (HOC) and each one handles the values from a given props. Currently the loading prop is set to `true` so the `withLoading` HOC will return the loading component showing a visual loading state to the user.

During this time the App container has finished fetching the JSON payload for the onward journey and the state is updated again. Loading is now set to false and data is set to the returned JSON data.

The routes container is rendered again, this time loading is set to false so the `withData` HOC can run some validation against the JSON payload then return either an error components of the original page container e.g. ArticleContainer passing in the JSON data with the pageData prop.

## Rendering a Page

The JSON payload for an article consists of a number of Blocks. Each block is an object which represents an element on the page, this could be a Heading, an Image, a Paragraph etc. Each of these blocks has a block type and a block type will match up to a specific container in Simorgh e.g. blockType: image will match to the Image container.

The ArticleMain container will iterate over each JSON block, match it against its corresponding react container and pass the data via props. These containers are where the logic for rendering each block type sits. It is at this point where we use the installed frontend components from the Psammead component library. For example the Image container will import the Figure container, and Figure will import and use the psammead-image and the psammead-image-placeholder components. An image on an article will generally have a caption, so the Figure container will import the caption container which may include more frontend components from Psammead to render a caption on top of the image.

This process is repeated for each block within an article, ultimately rendering the main body of a news article using a combination of React containers for the business logic and React components for the frontend markup.

## A Page Render Lifecycle

Each render is passed through a set of HOC's to enhance the page, these HOC's are;

- withContexts
- withPageWrapper
- withLoading
- withError
- withData

### withContexts
The withContexts HOC is a wrapper that provides access to the different context providers available in the application. Any child component inside of these context providers has access to the context data via the useContexts hook.

### withPageWrapper

The page wrapper HOC simply wraps the Article or FrontPage containers with a layout, at present we only have a single page layout. This layout includes the header, footer and context providers rendering the main body as a child between the header and the footer.

### withLoading

The loading HOC checks the value of the loading props, if it is false the Article or FrontPage container is simply returned.

If loading is set to true, the Loading component is returned instead rendering a visual loading view for the user.

### withError

The error HOC checks the error prop passed in, if error is set to null the Article or FrontPage container is simply returned.

If error is set to true the Error component is returned, giving the user a visual indication of the error e.g. a 500 error page.

### withData

Assuming the other HOC's have returned the original Article or FrontPage container the data HOC will run some validation checks on the JSON data passed in via the data prop. If all of the checks are satisfied the ArticleContainer will be returned with a single `pageData` prop. This pageData props will house the JSON data to be rendered e.g. the Optimo blocks for a given article.
