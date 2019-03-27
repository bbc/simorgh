# Vertical Rhythm

_Vertical Rhythm is an important concept in web design. It has the ability to bring a design together and make different elements feel consistent on the same page_

## Challenge

When rendering a page using shared components it is up to the renderer to decide on the spacing between the components, AKA _Vertical Rhythm_. This means the renderer will need to know the expected spacing between different components. 

## Solution

Along with UX we have decided that defining the minimum top and bottom margin on a components wrappers will allow us the flexibility we need. This also utilises [Collapsing Margins](https://css-tricks.com/what-you-should-know-about-collapsing-margins/). 

This would mean that each component will define the minimum margin that it expects above and below. By only specifying margins we allow the flexibility of any component being able to be rendered next to any other component with the minimum margin being respected thanks to Collapsing Margins. 

**Scenario 1**

CSS defined as:
```
| 16px margin |
|  Paragraph  |
| 16px margin |
| 16px margin |
|    Image    |
| 16px margin |
```

Which renders in the browser as:
```
| 16px margin |
|  Paragraph  |
| 16px margin |
|    Image    |
| 16px margin |
```

**Scenario 2**

CSS defined as:
```
| 16px margin |
|  Headline   |
| 32px margin |
| 16px margin |
|    Image    |
| 16px margin |
```

Which renders in the browser as:

```
| 16px margin |
|  Headline   |
| 32px margin |
|    Image    |
| 16px margin |
```

Also we will need vertical spacing not only between the wrappers but also between each of the children in the wrapper

## Background

In the past our applications have produced huge css files containing poor solutions for this problem. Therefore, this ADR should document the initial problem and our proposed long-term solution before we [remove the current spacing from psammead components](https://github.com/bbc/psammead/issues/399).
