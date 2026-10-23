# SaveButton

A reusable button component that handles common interactive states including loading, saving and accessibility features. It supports two visual variants: the default "Save for later" style and a "Follow" style used for following topics.

## Props

| Name               | Type                                                   | Required | Default  | Description                                                                                                            |
| ------------------ | ------------------------------------------------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `onClick`          | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Yes      | -        | Function called when the button is clicked                                                                             |
| `visualLabel`      | `string`                                               | Yes      | -        | Visible text displayed on the button                                                                                   |
| `hoverVisualLabel` | `string`                                               | No       | -        | Visible text shown instead of `visualLabel` when the button is saved and hovered/focused (e.g. "Remove" or "Unfollow") |
| `accessibleLabel`  | `string`                                               | Yes      | -        | Accessible name announced to screen readers                                                                            |
| `isLoading`        | `boolean`                                              | No       | `false`  | Shows the loading state and prevents activation                                                                        |
| `isUpdating`       | `boolean`                                              | No       | `false`  | Shows the in-progress state and prevents activation                                                                    |
| `isSaved`          | `boolean`                                              | No       | `false`  | Shows the saved/following state                                                                                        |
| `variant`          | `'save' \| 'follow'`                                   | No       | `'save'` | Selects the icon set and colour scheme: `'save'` for Save for later, `'follow'` for Follow Topic                       |
| `testId`           | `string`                                               | No       | -        | Sets a `data-testid` attribute for testing                                                                             |

## Usage

### Basic Usage

```tsx
import SaveButton from '#app/components/SaveButton';

const handleSaveArticle = () => {
  // Save article logic
};

<SaveButton
  onClick={handleSaveArticle}
  accessibleLabel="Save this article"
  visualLabel="Save article"
/>;
```

### Loading State

```tsx
<SaveButton
  onClick={handleSaveArticle}
  isLoading={true}
  visualLabel="Loading"
  accessibleLabel="Loading"
/>
```

### Follow Topic Variant

```tsx
<SaveButton
  variant="follow"
  onClick={handleFollowTopic}
  isSaved={isFollowed}
  visualLabel="Follow"
  hoverVisualLabel="Unfollow"
  accessibleLabel="Follow"
/>
```

## Accessibility

- Uses semantic `button` element
- Accessible name is communicated through `aria-labelledby`, pointing at visually hidden text so hover/focus-only label changes never change the announced name
- Automatically guards activation in JavaScript while loading or updating, instead of using the `disabled` attribute, so the button stays focusable and is never announced as "unavailable"
- Button state is communicated through both visual and programmatic means

## States

The component supports the following states, for both the `save` and `follow` variants:

- **Default**: Interactive button ready for user action
- **Loading**: Shows the initial loading state, prevents multiple submissions
- **Updating**: Shows an in-progress state while a save/follow action is being processed
- **Saved**: Indicates the save/follow action has completed

## Storybook

View all component states and interactions in [Storybook](./index.stories.tsx).

## Testing

The component can be tested using the enhanced testing library:

```tsx
import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import SaveButton from '.';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();

  render(
    <SaveButton
      onClick={handleClick}
      visualLabel="Save for later"
      accessibleLabel="Save for later"
    />,
  );

  const button = screen.getByRole('button', { name: 'Save for later' });
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```
