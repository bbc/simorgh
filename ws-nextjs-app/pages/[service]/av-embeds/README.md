# AV

## Description

AV Embeds routes deliver BBC media to third party websites.

## BFF Response

See [BFF Response for AV Embed](https://github.com/bbc/fabl-modules/tree/main/modules/application/simorgh-bff#av-embed)

## How routes are handled

There are no direct app routes connected to this component, because av-embeds are intended to be served as a raw piece of HTML outside any kind of framework. (In other words: There is no .page.tsx file exposed here, because this component is not intended to be run within our Next.js app, it's intended to be embedded into third party sites as raw HTML / within an iFrame)

Instead of exposing its own .page.tsx endpoint, this component makes use of the root catch-all `[service]/[[...]].page.tsx` endpoint. An `if` clause within [`[service]/[[...]].page.tsx`](https://github.com/bbc/simorgh/blob/latest/ws-nextjs-app/pages/%5Bservice%5D/%5B%5B...%5D%5D.page.tsx#L42C2-L45C4) invokes handleAvRoute.ts to request the appropriate data from our BFF, which is then passed over to an instance of [AvEmbedsPageLayout](https://github.com/bbc/simorgh/blob/latest/ws-nextjs-app/pages/%5Bservice%5D/%5B%5B...%5D%5D.page.tsx#L24C5-L25C47).

This route matches the file structure of this repo:

    ├── ws-nextjs-app
        ├── pages
            ├── [service]
                ├── [[...]].page.tsx
            ├── _app.page.tsx
            ├── _document.page.tsx

Routes that match this construct are correlated to the routes outlined in [Belfrage](https://github.com/bbc/belfrage/blob/master/lib/routes/routefiles/world_service.ex#L1764C1-L1798C6), some examples are:

| Service | URL |
|--|--|
| afrique (no variant) | `/afrique/av-embeds/monde-56475130/vpid/p045nk8n`  |
| afrique (no variant) (amp) | `/afrique/av-embeds/monde-56475130/vpid/p045nk8n/amp`  |
| serbian (variant) | `/serbian/lat/av-embeds/srbija-67007599/vpid/p0gjnmvp` |
| serbian (variant) (amp) |`/serbian/lat/av-embeds/srbija-67007599/vpid/p0gjnmvp/amp` |

## Component Structure

An AV Embed can be found here: https://www.bbc.com/ws/av-embeds/articles/c9wg48wz1rxo/p0lhc718/hi/amp

Component file structure

    ├── ws-nextjs-app
        ├── pages
            ├── [service]
                ├── av-embeds
                    ├── AvEmbedsMetadata.tsx
                    ├── AvEmbedsPageLayout.tsx
            ├── _app.page.tsx
            ├── _document.page.tsx

The AvEmbedsPageLayout component is essentially an instance of the MediaLoader component with the `embedded` property set to true. For more information see the [MediaLoader README](https://github.com/bbc/simorgh/blob/latest/src/app/components/MediaLoader/README.md). 
