## Description

This component renders a collection of most read articles to a news page so that relevant and trusted onward journeys are provided for the audience. It is featured on Homepages, Topic, Article, and Story pages and comprises a number rank, a title, and a link to the article. These elements sit within a region landmark. The component limits the number of Most Read items to be displayed based on the [`mostRead -> numberOfItems`](https://github.com/bbc/simorgh/blob/561414ae7c1e6636372381a8e0deddf48f926c1c/src/app/lib/config/services/mundo.ts#L256-L257) value for each service.

The component uses a [MostReadData](https://github.com/bbc/simorgh/blob/c4d38ae16587f29306d1109ea19bd55205c5709b/src/app/components/MostRead/types.ts#L79-L90) type, which contains an items array with the following fields: id, rank, title, href, and timestamp.

It also uses a [ColumnLayout](https://github.com/bbc/simorgh/blob/c4d38ae16587f29306d1109ea19bd55205c5709b/src/app/components/MostRead/types.ts#L7) type that determines how many columns the component is spread across: `oneColumn`, `twoColumn` or `multiColumn`. `multiColumn` will spread the data across 5 columns.

A [Size](https://github.com/bbc/simorgh/blob/c4d38ae16587f29306d1109ea19bd55205c5709b/src/app/components/MostRead/types.ts#L5) type is also used, which determines the sizing of the fonts used. This has values of `default` and `small`.

## Props

| Name         | type         | Description                                                                            |
| ------------ | ------------ | -------------------------------------------------------------------------------------- |
| data         | MostReadData | Contains the data rendered to the browser. i.e rank, title, and appropriate href link  |
| columnLayout | ColumnLayout | Determines how many columns the component is spread across. Defaults to `multiColumn`. |
| size         | Size         | Determines the font size used by the component. Defaults to `default`.                 |

## How to use

```tsx
{
  <MostRead data={mostRead} columnLayout="twoColumn" size="small" />;
}
```
