## Description

The `LiveLabel` applied compound component implements a span for use on live content based on the `LiveLabel` compound component.

## Props

| Argument          | Type    | Required | Default   | Example                 |
| ----------------- | ------- | -------- | --------- | ----------------------- |
| offScreenText     | string  | no       | `null`    | `'Watch Live'`          |
| lang              | string  | no       | `'en-GB'` | `'en-GB'`               |
| id                | string  | no       | `null`    | `'live-promo-1'`        |
| children          | node    | no       | `null`    | `<span>Headline</span>` |

## Usage

### Default

This example shows the default usage of the `LiveLabel` component, passing in the headline of the live promo as `children`

```jsx
import LiveLabel from '#components/LiveLabel';
import { Headline, Link } from '#psammead/psammead-story-promo/src';
import latin from '#components/ThemeProvider/fontScripts/latin';

<Headline script={latin} service="pidgin">
  <Link href="https://www.bbc.com/pidgin/live/1234567890">
    <LiveLabel>
      The headline of the live promo
    </LiveLabel>
  </Link>
</Headline>;
```

### When to use this component

The `LiveLabel` component can be used to show a promo for a Live page.


### Accessibility notes

The `LiveLabel` component retrieves the translation of the word or phrase for "Live" for the specified service. If the translation for "Live" is in English e.g. "LIVE", then screenreaders will often read this as "live", rhyming with "give", which is incorrect. In order for the word "live" to be pronounced correctly, the offscreen (or visually hidden) text needs to be in lower case e.g. "Live" (rhyming with "hive"), which most screenreaders _can_ pronounce correctly. 

It is possible for alternative offscreen text to be provided to the `LiveLabel` component. In this case, and in the case above, whereby the label that is displayed is not exactly the same as the text which is read out to the screenreader, then the word or phrase for "LIVE" will be `aria-hidden` making it invisible to the screenreader. The alternate offscreen text will be visually hidden, but will be announced by the screenreader instead.

If the `children` prop is provided to the `LiveLabel` component, then a comma and a space (", ") will be inserted into the offscreen text, which results in the screenreader pausing briefly after announcing the word or phrase for "Live". 