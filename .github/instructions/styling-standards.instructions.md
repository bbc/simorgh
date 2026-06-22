---
description: "Styling Standards"
applyTo: "src/app/components/**"
---
# Styling Standards

## Rules
- Use object style syntax.
- Do not use curried functions like this: 
```
  checkedSlider:
    (isChecked: boolean) =>
    ({ palette }: Theme) =>
      css({}),
```

- Use standard functions and move any conditional checks to the parent React component where the style is used:
```
  slider: () =>
  selectedSlider: ({ palette }: Theme) =>
    css({}),
  unSelectedSlider: ({ palette }: Theme) =>
    css({}),
```

```
// index.tsx
const Switch = ({ isChecked }: SwitchProps) => {
  return (
    <div
      css={[
        isChecked ? styles.selectedSlider : styles.unSelectedSlider,
      ]}
    />
  );
};
```

