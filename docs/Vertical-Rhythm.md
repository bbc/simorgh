# Vertical Rhythm

_Vertical Rhythm is an important concept in web design. It has the ability to bring a design together and make different elements feel consistent on the same page_

## Challenge

When rendering a page using shared components it is up to the renderer to decide on the spacing between the components, AKA _Vertical Rhythm_. This means the renderer will need to know the expected spacing between different components. 

## Proposed Solution

WORK IN PROGRESS ...

A component can only define the spacing below itself rather than both above and below. This would allow for the desired flexibility of any component followed by any other component.

That said, we need to confirm with UX the edge cases where a component has a large padding-bottom and is followed by a component which defines padding-top for additional spacing. 

**Example case**
A `<h1>` followed by a `<h2>` where:
- The `<h1>` has padding-bottom of 40px
- The `<h2>` expects a spacing of 32px above it
- The `<h2>` assumes the component above has a padding-bottom of 24px (the default spacing used by majority of components)

Based on the assumption the `<h2>` has a top padding of 8px (default bottom 24px + additional top padding 8px = desired 32px). However, rendered spacing is actually 48px rather than 32px due to difference between the _default padding-bottom_ and the _`<h1>`'s padding-bottom_.

## Background

In the past our applications have produced huge css files containing poor solutions for this problem. Therefore, this ADR should document the initial problem before we [remove the current spacing from psammead components](https://github.com/bbc/psammead/issues/399).

## Failed Solution

### Collapsing Margins

_We **cannot** use this solution because CSS grid and collapsing margins are not compatible due to the margin being rendered within the grid row and not collapsing between grid rows._

We could define the minimum top and bottom margin on a components wrappers will allow us the flexibility we need. This also utilises [Collapsing Margins](https://css-tricks.com/what-you-should-know-about-collapsing-margins/). 

This would mean that each component will define the minimum margin that it expects above and below. By only specifying margins we allow the flexibility of any component being able to be rendered next to any other component with the minimum margin being respected thanks to Collapsing Margins. 

**Scenario**

CSS defined as:
```
|     16px margin     |
|  Headline Wrapper   |
|     32px margin     |
|     16px margin     |
|    Image Wrapper    |
|     16px margin     |
```

Which renders in the browser as:

```
|     16px margin     |
|  Headline Wrapper   |
|     32px margin     |
|    Image Wrapper    |
|     16px margin     |
```
