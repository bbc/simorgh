## Description

The `Transcript` component renders video transcripts.

## Props

| Name            | type    | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| transcript      | object  | contains transcript content                           |
| title           | string  | title of video                                        |
| hideDisclaimer? | boolean | decides whether to show disclaimer (defaults to true) |

## Example

```tsx
<Transcript transcript={transcriptBlock} title={mediaTitle} hideDisclaimer />
```
