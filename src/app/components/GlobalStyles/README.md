# GlobalStyles

Applies the document-level [normalize.css](https://necolas.github.io/normalize.css/8.0.1/normalize.css)
rules and the inherited `box-sizing: border-box` baseline.

## Usage

```jsx
<GlobalStyles />
```

It is already rendered by `#app/components/PageLayoutWrapper`, so individual
pages and components do not need to render it themselves.

## Why this component still uses Emotion

New styling in Simorgh uses SCSS Modules, and this component was relocated from
`src/app/legacy/psammead/psammead-styles` without being converted. Both
available SCSS routes change behaviour or carry unacceptable risk:

- **A co-located `index.module.scss`** cannot express these rules. Every rule
  targets an element selector (`html`, `body`, `h1`, `*`), and Next.js rejects
  CSS modules whose selectors are not "pure" — each rule must contain at least
  one local class or id. Prefixing every rule with a local class applied to
  `<html>` would work, but it raises the specificity of every normalize rule
  from `0,0,1` to `0,1,1`, so rules such as `h1 { margin: .67em 0 }` would start
  overriding component class styles.
- **A plain global stylesheet** can only be imported from `pages/_app` in
  Next.js. `_app` renders AV embed pages outside `PageLayoutWrapper`, so those
  pages do not receive these rules today and set only `body { margin: 0 }`
  themselves. Importing the stylesheet in `_app` would newly apply normalize and
  `box-sizing: border-box` to the embedded media player.

Converting this component should therefore be done deliberately, alongside a
decision about whether AV embed pages should receive the same baseline.
