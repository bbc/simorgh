---
description: "Styling Standards"
applyTo: "**"
---
# Styling Standards

## Rules
- We use Emotion for styling.
- We use object style syntax.
- Do not use curried functions like this: 
```
  // index.style.tsx
  checkedSlider:
    (isChecked: boolean) =>
    ({ palette }: Theme) =>
      css({
        backgroundColor: `${isChecked} ? ${palette.GREY_6}: ${palette.POSTBOX}`,
        '&::before': {
          transform: 'translateX(20px)',
        },
      }),
```

- Use standard functions and move any conditional checks to the parent React component where the style is used:
```
// index.style.tsx
  slider: () =>
    css({
      '&::before': {
        transform: 'translateX(20px)',
      },
    }),
  selectedSlider: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_6,
    }),
  unSelectedSlider: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.POSTBOX,
    }),
```

```
// index.tsx
const Switch = ({ isChecked, onToggle }: SwitchProps) => {
  const handleToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <div css={style.switch} onClick={handleToggle}>
      <div
        css={[
          styles.slider,
          isChecked ? styles.selectedSlider : styles.unSelectedSlider,
        ]}
      />
    </div>
  );
};
```

