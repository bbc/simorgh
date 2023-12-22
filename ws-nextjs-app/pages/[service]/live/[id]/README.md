# Live Page

## Description

This is the first page to be created through our new NextJS app. It uses several NextJS features, including server side rendering and NextJS' pages router. 

## How routes are handled

Our Live Page is served through the following route: 
`/pages/[service]/live/[id]/[[variant]]`, where the double brackets in `[[variant]]` means that the variant is optional.

This route matches the file structure of this repo: 
  📦ws-nextjs-app
   ┗ 📂pages
   ┃ ┣ 📂[service]
   ┃ ┃ ┣ 📂live
   ┃ ┃ ┃ ┗ 📂[id]
   ┃ ┃ ┃ ┃ ┗ 📜[[...variant]].page.tsx
   ┃ ┃ ┗ 📜[[...]].page.tsx
   ┃ ┣ 📜_app.page.tsx
   ┃ ┗ 📜_document.page.tsx

Sample routes that match this construct are: 

| Service                    | URL                                                                                                                                                                                                                                              |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pidgin (no variant)        | `/pidgin/live/cdvxv61l6x8t`                                                                                                                                                                                                                      |
| Serbian (with variant lat) | `/serbian/live/c003pmmldygt/lat`                                                                                                                                                                                                                 |
| Serbian                    | `/serbian/live/c003pmmldygt`  This will ONLY work on your local host. This will NOT be served through the live NextJS app as upstream services are programmed to recognise an absence of the variant and it will instead re-route this request to alternative servers.  |

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

**It's incredibly important that request/response data is stored within `context.res` that requests can be handled appropriately.** 