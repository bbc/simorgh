# ActionButton

A reusable button component that handles common interactive states including loading, disabled, and accessibility features.

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClick` | `() => void` | Yes | - | Function called when button is clicked |
| `isLoading` | `boolean` | No | `false` | Shows loading state and disables interaction |
| `isSaved` | `boolean` | No | `false` | Shows the saved state to indicate the action has completed |
| `disabled` | `boolean` | No | `false` | Disables the button |
| `label` | `string` | Yes | - | Accessible label for screen readers |
| `buttonText` | `string` | Yes | - | Visible text displayed on the button |

## Usage

### Basic Usage

```tsx
import ActionButton from '#app/components/ActionButton';

const handleSaveArticle = () => {
  // Save article logic
};

<ActionButton
  onClick={handleSaveArticle}
  label="Save this article"
  buttonText="Save article"
/>
```

### Loading State

```tsx
<ActionButton
  onClick={handleSaveArticle}
  isLoading={true}
  label="Saving article"
  buttonText="Saving..."
/>
```

### Disabled State

```tsx
<ActionButton
  onClick={handleSaveArticle}
  disabled={true}
  label="Save this article"
  buttonText="Save article"
/>
```

## Accessibility

- Uses semantic `button` element
- Includes `aria-label` for screen readers
- Provides `title` attribute for tooltips
- Automatically disables interaction when loading or disabled
- Button state is communicated through both visual and programmatic means

## States

The component supports the following states:

- **Default**: Interactive button ready for user action
- **Loading**: Shows processing state, prevents multiple submissions
- **Disabled**: Prevents interaction when action is not available
- **Saved**: Can be used to indicate completed action

## Storybook

View all component states and interactions in [Storybook](./index.stories.tsx).

## Testing

The component can be tested using the enhanced testing library:

```tsx
import { render, screen, fireEvent } from '#app/components/react-testing-library-with-providers';
import ActionButton from '.';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  
  render(
    <ActionButton
      onClick={handleClick}
      label="Test button"
      buttonText="Click me"
    />
  );
  
  const button = screen.getByRole('button', { name: 'Test button' });
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```