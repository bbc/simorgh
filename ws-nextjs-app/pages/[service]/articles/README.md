# Article Page

## Description

This route is used to render article pages, story pages (STY), photo gallery pages (PG) and media asset pages (MAP).

## BFF Response

BFF details for Live pages can be found here:
[BFF Article Response](https://github.com/bbc/fabl-modules/tree/main/modules/application/simorgh-bff#articles)

## How routes are handled

Our Article Page is served through the following route:
`/pages/[service]/articles/[id]/[[variant]]`, where the double brackets in `[[variant]]` means that the variant is optional.

This route matches the file structure of this repo:

    ├── ws-nextjs-app
        ├── pages
            ├── [service]
                ├── articles
                    ├── [id]
                     ├── [[...variant]].page.tsx
                     ├── handleArticleRoute.tsx
            ├── _app.page.tsx
            ├── _document.page.tsx

Sample routes that match this construct are:

| Service                    | URL                                                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gahuza (no variant)        | `gahuza/articles/cy4849j0jyzo`                                                                                                                                                                                                                                           |
| Serbian (with variant cyr) | `serbian/articles/c6294n8el2ro/cyr`

#### Developer information

**It's important that request/response data is stored within `context.res`, so that requests can be handled appropriately by our ELBs.**

When working locally, make sure that the following request header is set:

| Header name                    | Value                                                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page-type`        | `article`

 Also be aware that, locally, your request will touch on the following functions:

1. `/ws-nextjs-app/utilities/pageRequests/getPageData.ts`
2. `/src/app/routes/utils/fetchDataFromBFF/index.ts`
3. `/ws-nextjs-app/app/api/local/[service]/[pageType]/[id]/[[...optionalParams]]/route.api.ts` - This route is served by the next-js app to retrieve local data from the `data` directory.
