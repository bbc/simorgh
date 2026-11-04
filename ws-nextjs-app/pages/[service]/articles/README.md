# Article Page

## Description

This route is used to render article pages, story pages (STY), photo gallery pages (PG) and media asset pages (MAP).

## BFF Response

BFF details for Live pages can be found here:
[BFF Article Response](https://github.com/bbc/fabl-modules/tree/main/modules/application/simorgh-bff#articles)

## Markdown articles

Append `.md` to an article URL (including after a script variant) to request
Markdown, for example `/russian/articles/c6wyzl2xdyz2o.md` or
`/serbian/articles/c6294n8el2ro/lat.md`. The `renderMarkDown` toggle must be
enabled for the service; otherwise the request returns 404. Local stub toggles
enable Russian only by default.

Successful responses use `Content-Type: text/markdown; charset=utf-8` and retain
the article's cache headers and existing Link resource hints. The Link header
also includes `rel="canonical"` pointing to the public BBC URL without `.md` or
query parameters. `x-markdown-tokens` provides an approximate token count.

The renderer supports headlines, subheadlines, paragraph text and images;
unsupported block types are omitted. Markdown control characters in article
text and image descriptions are escaped to preserve their literal content.

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
