## Description

A component constructing the Related Content section for Article pages. The sections can hold a list of RelatedContentItem or a single RelatedContentItem. The section can have a max of 6 items.

## Props

| Name               | type    | Description                                                          |
| ------------------ | ------- | -------------------------------------------------------------------- |
| content            | object  | Optimo Related Content type block                                    |
| emphasiseFirstItem | boolean | Optional lead-and-supporting layout, defaults to false               |
| leadPreview        | object  | Optional opening paragraph and native reading time for the lead item |

`emphasiseFirstItem` gives the first item in the existing editorial order a larger
lead row and presents the remaining items as compact rows. It is enabled only
inside the WS-3523 Option B treatment. The existing layout remains the default.
The new layout uses SCSS Modules and the shared dark-UI marker for its colours,
while keeping the existing promo rendering, data extraction and analytics.

The lead can display a complete opening paragraph, reading time and a visible
destination action. Its existing headline link remains the sole keyboard stop;
the action shares that link's clickable card area. Preview text is matched to
the lead URL and is never shown on supporting items. Missing preview data leaves
the normal headline, image and destination available.

## Example ltr/rtl

```javascript
const contentExample = {
                type: RelatedContent,
                model:
                    blocks: [
                        {type: link, ...},
                        {type: link, ...}
                    ], ...
                }

<RelatedContentSection content={contentExample}/>
```

## Uninuitive implementation

Inside index.styled.jsx you will find the Grid Wrappers for the Recommendation Section and it's list items:

### Grid Parent Wrapper:

```javascript
export const RelatedContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-${GEL_SPACING} - ${GEL_SPACING_BORDER_HLF});
`;
```

### Grid ListItem Wrapper:

```javascript
export const StyledStoryPromoLi = styled(StoryPromoLiBase)`
  display: flex;
  margin: 0;
  width: 100%;
  height: inherit;
  padding: calc(${GEL_SPACING} - ${GEL_SPACING_BORDER_HLF});

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 50%;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 33.33%;
  }
`;
```

### Implementation explanation

### Grid Layout Using `display: flex;`

This is a Grid layout using flexbox. In `RelatedContentGrid` we use the `flex-wrap: wrap;` property to wrap all children items into multiple rows. The number of items per rows gets decided by the `width` in % specified in `StyledStoryPromoLi`, where:
| width (%) | number of columns (unit) |
| ------- | ------ |
| 100% | 1 |
| 50% | 2 |
| 33.33% | 3 |

> ### Why?
>
> `display: grid;` is not supported by OperaMini browser, therefore we need to implement a grid layout using flexbox.

### flex gap using padding & margin

We use padding in `StyledStoryPromoLi` to create an equal gap between all children of the Grid. We then compensate for the extra padding around the Grid by adding a negatve margin to the Grid: `margin: calc(-${GEL_SPACING} - ${GEL_SPACING_BORDER_HLF});`.

> ### Why?
>
> The `gap` property causes the items to leave a space at the end of each row, this causes the Related Content Gap to not align with the Top Stories gaps below the component:
>
> <img
>   width="1013"
>   alt="Screenshot 2022-07-15 at 12 57 30"
>   src="https://user-images.githubusercontent.com/90621252/179218907-1e40b68b-70f2-40d5-bd88-82910bd0d56b.png"
> />
>
> This could have been fixed by using `flex-grow: 1;`. However, this causes all children with less row's items to grow larger than other row's items:
>
> <img
>   width="745"
>   alt="Screenshot 2022-07-15 at 12 58 47"
>   src="https://user-images.githubusercontent.com/90621252/179218944-448a1f01-2673-4f46-9bfd-67164424b329.png"
> />
