# ActionTooltip Component

This component displays a dismissible tooltip used to confirm the result of a user action (e.g. saving or removing an article), with success, error and removed states.

## Props

| Name        | type                | Description                              |
| ----------- | ------------------- | ----------------------------------------- |
| status      | ActionTooltipStatus | The current state of the tooltip          |
| content     | ReactNode           | The tooltip content to display            |
| closeLabel  | string              | Accessible label for the close button     |
| onClose     | () => void          | Called when the tooltip is dismissed      |

## How to use

```tsx
<ActionTooltip
  status={status}
  content={content}
  closeLabel={closeLabel}
  onClose={onClose}
/>
```
