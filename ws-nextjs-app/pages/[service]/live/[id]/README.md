# Live Page

## Description

Live pages provide live media streams and posts updated in real time.

## BFF Response

BFF details for Live pages can be found here:
[BFF Live Response](https://github.com/bbc/fabl-modules/tree/main/modules/application/simorgh-bff#live)

## How routes are handled

Our Live Page is served through the following route:
`/pages/[service]/live/[id]/[[variant]]`, where the double brackets in `[[variant]]` means that the variant is optional.

This route matches the file structure of this repo:

    ├── ws-nextjs-app
        ├── pages
            ├── [service]
                ├── live
                    ├── [id]
    	                ├── [[...variant]].page.tsx
                    ├── [[...]].page.tsx
            ├── _app.page.tsx
            ├── _document.page.tsx

Sample routes that match this construct are:

| Service                    | URL                                                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pidgin (no variant)        | `/pidgin/live/c7p765ynk9qt`                                                                                                                                                                                                                                           |
| Serbian (with variant lat) | `/serbian/live/c003pmmldygt/lat`                                                                                                                                                                                                                                      |
| Serbian                    | `/serbian/live/c003pmmldygt` This will ONLY work on your local host. This will NOT be served through the live NextJS app as upstream services are programmed to recognise an absence of the variant and it will instead re-route this request to alternative servers. |

#### Server Side functions

Within `[[variant]].page.tsx`, the `getServerSideProps` function is called on the server side when a request to a live page is made. It's important that this function returns an object that directly correlates to the props expected by the default exported component within `[[variant]].page.tsx`.

```
export const getServerSideProps: GetServerSideProps = async context => {

  context.res.statusCode = data.status;

  return {
    props: {
      ...props expected by LivePageLayout
    },
  };
};

export default LivePageLayout;
```

In the code snippet above, NextJS will serve the component returned by `LivePageLayout`. Before doing so, it calls `getServerSideProps` (on the server) to retrieve the requisite props, which are then used to call `LivePageLayout`, which in turn returns a valid HTML element.

**It's important that request/response data is stored within `context.res`, so that requests can be handled appropriately by our ELBs.**

## Component Structure

A typical Live page can be found here: https://www.test.bbc.com/pidgin/live/c7p765ynk9qt

Component file structure

    ├── ws-nextjs-app
        ├── pages
            ├── [service]
                ├── Live
                    ├── [id]
    	                ├── Header
    	                ├── KeyPoints
    	                ├── Posts
    	                ├── ShareButton
    	                ├── Stream
    	                ├── LivePageLayout

The LivePageLayout propagates respective parts of BFF data to the `Header`, `KeyPoints`, `Stream` and `Pagination` components.

### Stream component

The stream component takes in the following properties:

    {
    	streamContent:  StreamResponse  |  null;
    	contributors:  string  |  null;
    }

The `Stream` component will process `streamContent` and populate its body with a series of `Posts`. `Posts` can currently support the following content types: `paragraph`, `unorderedList`, `orderedList`, `image`, `video` and `social`.

### Header component

The header component takes in the following properties:

    {
    	showLiveLabel:  boolean;
    	title:  string;
    	description?:  string;
    	imageUrl?:  string;
    	imageUrlTemplate?:  string;
    	imageWidth?:  number;
    	mediaCollections?:  MediaCollection[] |  null;
    }

`mediaCollections` contains the necessary information for live video streams.
