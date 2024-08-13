## Description

The `BulletedList` component is a styled bulleted (unordered) list that works for right-to-left and left-to-right languages.

## Props

| Argument          | Type                                  | Required | Default     | Example     |
| ----------------- | ------------------------------------- | -------- | ----------- | ----------- |
|                   |
| bulletPointShape  | `'round'` or `'square'` or `'hidden'` | No       | `'round'`   | `'round'`   |
| bulletPointColour | CSS Colour                            | No       | `'#3F3F42'` | `'#ff0000'` |

## Usage

Use `BulletedList` in place of a `ul` element with required props. Pass in `BulletedListItem` or `li` as children.

```tsx
{
  <BulletedList bulletPointShape="square">
    <BulletedListItem>A list item</BulletedListItem>
    <BulletedListItem>Another item</BulletedListItem>
  </BulletedList>;
}

{
  <BulletedList bulletPointShape="round" color="#B80000">
    <li role="listitem">A list item</li>
    <li role="listitem">Another item</li>
  </BulletedList>;
}
```

### When to use this component

`BulletedList`s can be used wherever you need a standard GEL unordered list.

### When not to use this component

It's not ideal for when you need a custom bullet. Use the standard `<ul>` instead if you need to style your bullets.

### Accessibility notes

- The bullets are not read by screen readers and are generated using pseudo-elements.

- We have added role list and role listitem to the corresponding items due to a VoiceOver bug to reinstate the list semantics
