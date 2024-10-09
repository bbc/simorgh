## Description

This component renders a consent banner that the user must 'accept' in order to view the embed.

## Props

| Name     | type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| pageType | string | The page type the embed will render on e.g. `STY`, `article` |
| provider | string | The provider of the embed e.g. `twitter`, `instagram`        |

## How to use

Wrap the `EmbedConsentBannerCanonical` or `EmbedConsentBannerAmp` component around your embed component. This will prevent the embed component from rendering until the user has clicked 'accept' on the consent banner.

```tsx
<EmbedConsentBannerCanonical pageType="article" provider="youtube">
  <CanonicalEmbed />
</EmbedConsentBannerCanonical>
```
