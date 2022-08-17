# Related Content Item

## Description

A Related Content Single item built using OptimoPromos. this component gets Optimo data of single link in the Related Content Data and displays an image followed by a heading.

## Props

| Name           | type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| item           | object | Single link of a related content type block |
| ariaLabelledBy | string | Id used to fix a bug in TalkBack.           |

## A11y notes

Due to a `TalkBack` bug causing the assistive technology to read each span on separate swipes/gestures, we need to pass a unique a11yId to fix this bug. This a11y Id is used as id for the parent span holding the Promo's text and as aria-labelledby for the parent link of the text span.
More [here](https://github.com/bbc/simorgh/issues/9652)

## Example ltr/rtl

```javascript
const itemExample = {
                type: link,
                model:
                    blocks: [
                        {type: image, ...},
                        {type: text, ...},
                        {type: aresBlock, ...}
                    ], ...
                }

<RelatedContentItem item={itemExample} ariaLabelledBy={"related-content-promo-example-0"}/>
```
