## Description

A List of Colour Cards used in storybook's colours palette documentation. At the moment of writing, this component is dev only and should not be used in live environements.

## Props

| Name   | type                                          | Description                                                        |
| ------ | --------------------------------------------- | ------------------------------------------------------------------ |
| Colors | `ts{colorName: string; colorCode: string;}[]` | List of colours object with UX/variable name and hexadecimal value |

## Usage

### Component Health

```tsx
const COLOUR = [
  { colorName: 'ARCHIVE_BLUE ', colorCode: '#3A549C' },
  { colorName: 'BLACK ', colorCode: '#000000' },
  { colorName: 'BLUEJAY ', colorCode: '#0F556C' },
  { colorName: 'BLUEJAY_LHT ', colorCode: '#C3DEE7' },
  { colorName: 'CHALK ', colorCode: '#ECEAE7' },
];

return <ColorList Colors={LEGACY} />;
```
