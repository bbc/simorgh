# ImageAdapter (Next.js Image trial)

A small, BBC-owned wrapper around [Next.js Image](https://nextjs.org/docs/pages/api-reference/components/image) for canonical iChef images. It follows the [Next.js Image PoC](https://github.com/bbc/simorgh/pull/14533) from [WS-3220](https://bbc.atlassian.net/browse/WS-3220) and is being trialled in [WS-3608](https://bbc.atlassian.net/browse/WS-3608).

**Status:** trial only, behind the `nextJsImageAdapter` toggle, which is disabled in every environment. With the toggle off, nothing changes for users.

## How it works

- Next.js Image renders the `<img>` and generates `srcset` candidates.
- A custom loader ([ichefLoader.ts](./ichefLoader.ts)) replaces `{width}` in the iChef template. It doesn't use the Next.js optimisation endpoint (`/_next/image`); iChef still resizes and delivers images.
- The BFF decides the format. When the template ends in `.webp`, a `<picture>` adds a WebP `<source>`, and the `<img>` falls back to the original JPEG/PNG. Other templates render a plain `<img>`. The browser chooses the format and width.
- Candidate widths come from `images.deviceSizes` in [next.config.js](../../../../ws-nextjs-app/next.config.js). They match the existing promo widths (85–800), so iChef URLs and cache entries stay the same.
- The `<img src>` uses the 240px image, like the existing promo, through Next.js `overrideSrc`. Without it, Next.js would use the largest width, and browsers without `srcset` support, such as Opera Mini, would download the 800px image.
- Custom loaders bypass `images.remotePatterns`, so the loader validates sources itself: HTTPS `ichef.bbci.co.uk` or `ichef.test.bbci.co.uk` with an `/ace/(ws|standard)/{width}/` template. Other sources render only the placeholder.
- AMP and Lite are not handled here. Consumers keep them on the existing [Image](../Image/index.tsx) component, and the adapter renders nothing if used on either.

## Props

```ts
type ImageAdapterProps = {
  src?: string; // iChef template containing {width}
  alt: string;
  width: number; // intrinsic size; also sets the aspect ratio
  height: number;
  sizes: string; // must match the consumer's layout
  loading?: 'lazy' | 'eager' | 'priority'; // default 'lazy'
  placeholder?: 'light' | 'dark' | 'none'; // default 'light'
  className?: string;
};
```

### Prop decisions

The PoC adapter had 18 props and the existing Image component has 20. The trial started with the 9 proposed props and kept only what the first consumer needs.

| Change | Reason |
| --- | --- |
| `lazyLoad`, `preload`, `fetchPriority` → `loading` | One choice per image. `priority` means eager loading with `fetchpriority="high"`. |
| `placeholder`, `darkPlaceholder` → `placeholder` | One value instead of two booleans. |
| `aspectRatio` removed | Calculated from `width` and `height`. |
| `format` removed | The BFF decides the format (see below). |
| `attribution` removed | Only used by `amp-img`; the adapter doesn't render AMP. Add it back when AMP moves to the adapter. |
| Preload removed | The trial consumer doesn't preload, and adding a preload would introduce a request it doesn't make today. Add it back for a consumer that needs it, such as article lead images. |
| `children`, `imageRef`, `style`, `hasCaption` left out | Not needed by the trial consumer. `Promo.Image` renders its overlay children outside the image. |

## Trial consumers

### Image implementations

All of these render through the shared [Image](../Image/index.tsx) component unless stated otherwise.

| Implementation | Used on |
| --- | --- |
| [Promo.Image](../../legacy/components/Promo/image.jsx) | Home (`HierarchicalGrid`, `HighImpactPromo`), Topics and My News (`CurationGrid` → `CurationPromo`) |
| [Billboard](../Billboard/index.tsx) + [MaskedImage](../MaskedImage/index.tsx) | Billboard curations on Home and Topics |
| [MessageBanner](../MessageBanner/index.tsx) | Curation and Article message banners |
| [ImageWithCaption](../ImageWithCaption/index.tsx) | Article and Media Article body images with captions |
| [RecommendationsPromoImage](../Recommendations/RecommendationsPromoImage/index.tsx) | Article recommendations |
| [OptimoPromos](../../legacy/components/OptimoPromos/index.jsx) (own image) | Article related content |
| [EmbedImages](../Embeds/EmbedImages/index.tsx) | Embedded images |
| [PortraitVideoPromo](../PortraitVideoCarousel/PortraitVideoPromo/index.tsx), [FrostedGlassPromo](../FrostedGlassPromo/index.tsx) | Portrait video carousel, frosted promos |
| Byline contributors, [SocialLinks](../SocialLinks/index.tsx), [MediaLoader placeholder](../MediaLoader/Placeholder/index.tsx) | Article bylines, social links, media placeholders |
| Legacy `EpisodeList`, `OnDemandImage`, `PodcastPromo` | On-demand audio/TV and podcast pages |

### Agreed trial set

The team agreed on the three most widely used image types, trialled one at a time:

1. **`Promo.Image`, integrated here.** It is the most widely used image, a standard 16:9 canonical image on Home, Topics and My News, and has no captions.
2. **Billboard.** Covers masked and cropped layouts with a large hero image.
3. **MessageBanner.** Covers banner layouts and dark backgrounds.

`ImageWithCaption` (captions, attribution and the article lead image preload) is out of scope for now.

### First trial: `Promo.Image`

With the toggle on, [Promo.Image](../../legacy/components/Promo/image.jsx) uses the adapter only for canonical, landscape iChef `ace` templates. AMP, Lite, portrait images and programme (`images/ic`) images stay on the existing renderer.

### Comparison with the existing renderer

- **Unit tests** render the same promo with the toggle off and on, using the production BFF URL shape, for lazy, eager, high-priority and large images. `alt`, `src`, `sizes`, `loading`, `fetchpriority` and the reserved space match.
- **Browser check** on the local Mundo Home page at 375px and 1280px: all six promos checked had the same rendered size, wrapper size and selected iChef width with the toggle on and off.
- **Captions and attribution:** not applicable. `Promo.Image` has no caption, and it only passed attribution to AMP.

Differences:

- Topic pages gain a JPEG/PNG fallback for browsers without WebP. Previously only Home rendered `<picture>` with a fallback.
- Next.js adds `decoding="async"` to the image.
- Next.js removes the placeholder background even when the image loads before hydration. The existing renderer misses that `onLoad`, but the placeholder is hidden behind the image either way.
- Local fixtures don't have `.webp` templates, so locally the adapter serves the original format while the existing promo appends `.webp` itself. Production BFF data is unaffected.

## BFF and URL preparation

The Simorgh BFF already prepares promo image URLs. Its `content-summaries` transformer passes every `imageUrl` through `addWebpExtensionToIchefUrls`, which normalises the path to `/ace/ws/` and appends `.webp`. Production promos therefore receive templates such as `https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/…/image.jpg.webp`.

To avoid duplicating that, the adapter doesn't add `.webp` or rewrite paths. It only:

- validates the template,
- replaces `{width}` with each candidate width,
- removes the trailing `.webp` to get the fallback for browsers without WebP support.

The existing promo still appends `.webp` when it's missing. Removing that is part of the BFF refactor ([WS-94](https://bbc.atlassian.net/browse/WS-94)), not this trial.

## Trying it locally

Set `nextJsImageAdapter` to `enabled: true` in [localConfig.js](../../lib/config/toggles/localConfig.js), or enable it for a service in test iSite and run `yarn dev:toggles:test`. Restart the dev server after changing `next.config.js`.
