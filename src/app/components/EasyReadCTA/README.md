## Description

This component renders an Easy Read call to action (CTA).This component sits directly below the h1 at the top of article pages that have an AI generated "easy read" version available, and can be clicked to toggle between the standard version and the easy read equivalent.

## Props

| Name            | type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| easyReadAssetId | string | An asset id linnking to the easy read version of the article |
| originalAssetId | string | An asset id linnking to the standard version of the article  |

## How to use

```tsx
{
    <EasyReadCTA
        easyReadAssetId="crkdy3r685jo"
        originalAssetId="cy0grkwd3zlo"
      />,
}
```
