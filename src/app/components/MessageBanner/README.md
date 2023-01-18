# MessageBanner

## Description

This component renders a message banner which comprises an H2 heading, a link (styled as a CTA), an image and an optional description as a paragraph. These elements sit within a region landmark. The banner can be rendered anywhere on a page and uses the curation `visualStyle` of `BANNER`. The banner background is generated programmatically with CSS radial and linear colour gradients at each breakpoint.

## Props

| Name      | type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| summaries | [] of {} | Contains the banner link, image url and optional description |
| title     | string   | The H2 title of the banner                                   |

## How to use

Map curations at the location you wish to render the banner and use the `summaries` and `curationTitle` as props for the `MessageBanner`. The `curationId` is used to give the child element a unique ID. Wrap the `MessageBanner` component within a react fragment or a `div`.

```tsx
{
  curations.map(({ summaries, title: curationTitle, curationId }) => (
    <React.Fragment key={curationId}>
      <MessageBanner title={curationTitle} summaries={summaries} />
    </React.Fragment>
  ));
}
```

You can add a ternary condition around the `MessageBanner` to select curations with a `visualStyle` of `BANNER`

```tsx
{
  visualStyle === 'BANNER' && (
    <MessageBanner title={curationTitle} summaries={summaries} />
  );
}
```
