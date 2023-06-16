# MostRead

## Description

This component renders a collection of most read articles to a news page so that relevant and trusted onward journeys are provided for the audience. It is featured on Homepages, Topic, Article, and Story pages and comprises a number rank, a title, and a link to the article. These elements sit within a region landmark. The component uses `visualStyle` and `visualProminence` to determine the number of ranked items and its positioning on the page. e.g `visualStyle` = `RANKED` & `visualStyle` = `LOW` will display 5 ranked items. While `visualStyle` of `RANKED` and `visualStyle` of `NORMAL` will display 10 ranked items.

The component uses a [MostReadData](https://github.com/bbc/simorgh/blob/c4d38ae16587f29306d1109ea19bd55205c5709b/src/app/components/MostRead/types.ts#L79-L90) type, containing a simplified version of data which is passed in and used to render the information on the page. This data contains an items array with the following fields: id, rank, title, href, and timestamp.

It also uses [ColumnLayout](https://github.com/bbc/simorgh/blob/c4d38ae16587f29306d1109ea19bd55205c5709b/src/app/components/MostRead/types.ts#L7) type which determines how many columns the component is spread across: `oneColumn`, `twoColumn` or `multiColumn`.

## Props

| Name         | type         | Description                                                                           |
| ------------ | ------------ | ------------------------------------------------------------------------------------- |
| data         | MostReadData | Contains the data rendered to the browser. i.e rank, title, and appropriate href link |
| columnLayout | ColumnLayout | Determines how many columns the component is spread across. Defaults to `twoColumn`.  |

## How to use

```tsx
{
  <MostRead data={mostRead} columnLayout="twoColumn" />;
}
```
