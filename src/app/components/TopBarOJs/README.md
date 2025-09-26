## Description

This component renders a collection of Top Stories within a scrollable container, providing onward journeys for audiences on mobile. The component is rendered within the Navigation Header, above the main content of article pages.

## Props

| Name   | type           | Description                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| blocks | TopStoryItem[] | Array of Top Stories items to display within the component |
| id     | string         | Unique ID for the region landmark.                         |

## How to use

```tsx
{
    <TopBarOJs
        blocks={blocks}
        id={id}
    />,
}
```
