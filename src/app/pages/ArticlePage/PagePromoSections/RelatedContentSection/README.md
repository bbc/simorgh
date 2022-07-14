# Related Content Section

## Description

A component constructing the Related Content section for Article pages. The sections can hold a list of RelatedContentItem or a single RelatedContentItem. The section can have a max of 6 items.

## Props

| Name    | type   | Description                       |
| ------- | ------ | --------------------------------- |
| content | object | Optimo Related Content type block |

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
