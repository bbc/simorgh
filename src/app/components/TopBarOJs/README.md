## Description

This component renders a collection of Top Stories within a scrollable container, providing onward journeys for audiences on mobile. The component is rendered within the Navigation Header, above the main content of article pages.

For the enabled Top Stories treatment, content loads near the viewport. The
loading skeleton does not register a view event. At desktop widths the top bar
is hidden and the secondary column retains both its loading trigger and content.

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
