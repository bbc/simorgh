# MostRead

## Description

This component renders a collection of most read articles to a news page so that relevant and trusted onward journeys are provided for the audience. It is featured on Homepages, Topic, Article, and Story pages and comprises a number rank, a title, and a link to the article. These elements sit within a region landmark. The component is added by the editorial team via Tipo using `visualStyle` and `visualProminence` to determine the number of ranked items and its positioning on the page. e.g `visualStyle` = `RANKED` & `visualStyle` = `LOW` will display 5 ranked items. While `visualStyle` of `RANKED` and `visualStyle` of `NORMAL` will display 10 ranked items.

## Props

| Name         | type         | Description                                                                                    |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------- |
| data         | MostReadData | Contains the information rendered to the component. i.e rank, title, and appropriate href link |
| columnLayout | ColumnLayout | Determines how many columns the component is spread across. Defaults to two columns.           |

## How to use

```tsx
{
  <MostRead data={mostRead} columnLayout="twoColumn" />;
}
```
