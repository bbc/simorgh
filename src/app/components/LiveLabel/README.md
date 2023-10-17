## Description

The `LiveLabel` component implements a span for use on live content.

## Props

| Argument          | Type    | Required | Default   | Example                 |
| ----------------- | ------- | -------- | --------- | ----------------------- |
| offScreenText     | string  | no       | `null`    | `'Watch Live'`          |
| lang              | string  | no       | `'en-GB'` | `'en-GB'`               |
| children          | node    | no       | `null`    | `<span>Headline</span>` |

## Usage

```jsx
import LiveLabel from '#app/components/LiveLabel';
import { Headline, Link } from '#psammead/psammead-story-promo/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

<Headline script={latin} service="news">
  <Link href="https://www.bbc.co.uk/news">
    <LiveLabel offscreenText='Live'>
      The headline of the live promo
    </LiveLabel>
  </Link>
</Headline>;
```

### When to use this component

The `LiveLabel` component can be used to show a promo for a Live page.


### Accessibility notes

The `LiveLabel` example above shows this component being hidden to screen readers with visually hidden text rendered alongside it. This is to ensure the screen reader announces the word 'Live' correctly. This does not need to be accounted for in other languages.
