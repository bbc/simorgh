# MessageBanner

## Description

This component renders a message banner which contains a link (styled as a CTA) and an H2 header. The banner can be rendered anywhere on a page. The background for the banner is generated programmatically with CSS. The inclusion of an image overlaid onto the background is optional

## Props

| Name | type   | Description                                                  |
| ---- | ------ | ------------------------------------------------------------ |
| xxx  | string | The page type the embed will render on e.g. `STY`, `article` |
| xxx  | string | The provider of the embed e.g. `twitter`, `instagram`        |

## How to use

Wrap the `EmbedConsentBannerCanonical` or `EmbedConsentBannerAmp` component around your embed component. This will prevent the embed component from rendering until the user has clicked 'accept' on the consent banner.

```tsx
<EmbedConsentBannerCanonical pageType="article" provider="youtube">
  <CanonicalEmbed />
</EmbedConsentBannerCanonical>
```
