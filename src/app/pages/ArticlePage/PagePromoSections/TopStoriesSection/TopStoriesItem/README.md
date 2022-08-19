# Top Stories Item

## Description

A Top Stories Single item built using OptimoPromos. this component gets Optimo data from the Top Stories type Data found in the secondary column data. This component displays a heading and timestamp.

## Props

| Name           | type   | Description                                                     |
| -------------- | ------ | --------------------------------------------------------------- |
| item           | object | Single item from the top stories array in secondary column data |
| ariaLabelledBy | string | Id used to fix a bug in TalkBack.                               |

## A11y notes

Due to a `TalkBack` bug causing the assistive technology to read each span on separate swipes/gestures, we need to pass a unique ariaLabelledBy to fix this bug. This a11y Id is used as id for the parent span holding the Promo's text and as aria-labelledby for the parent link of the text span.
More [here](https://github.com/bbc/simorgh/issues/9652)

## Example ltr/rtl

```javascript
const itemExample = [
                    {
                        headlines: {
                            headline: "hello";
                        }
                        timestamp: 1588664285000,
                        ...
                    }
                ]

<TopStoriesItem item={itemExample} ariaLabelledBy={"top-stories-promo-example-0"}/>
```
