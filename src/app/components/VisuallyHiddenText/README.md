## Description

Adds non-visible text to the page, to be utilised by screen-readers and other assistive technology.

## Installation

`npm install #components/simorgh-visually-hidden-text/src`

## Props

| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| No props. |      |          |         |         |

## Usage

Example 1:

```tsx
import VisuallyHiddenText from 'src/app/components/VisuallyHiddenText';

const WrappingComponent = () => (
  <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
);
```

Example 2:

```tsx
import VisuallyHiddenText from 'src/app/components/VisuallyHiddenText';

const WrappingComponent = () => (
  <VisuallyHiddenText>
      <span role="text"> 
        <span>{product}</span>, {serviceLocalizedName} - {home}
      </span> 
  </VisuallyHiddenText>
);
```


Please bear in mind that if CSS is disabled, any `children` will be shown inline. Testing your usage of the component should include disabling page styling.

### When to use this component

Visually hidden text should be used alongside any component which relies on visual aids or styling to communicate its purpose, as these aids may not be present for users who are relying on assistive technologies.

For example, a source/copyright overlay on an image may seem obvious in purpose when viewed on a page, but the contents of such a component could be jarring or confusing when immediately spoken out following the alt-text of an image. As a result, it utilises this component to provide additional context before reading its main text content.

### When not to use this component

Avoid using this component with text that would cause unnecessary repetition. For example, there is no need to add visually hidden text stating "Image" next to an `img` tag, as assistive tech already explicitly communicates the presence of an image, and this would likely only prove confusing or irritating to users.

Similarly, when adding hidden text that will occur partway through an article, avoid using phrases that may imply that the main body is over. Suddenly hearing a phrase like "Read more on [subject]" may suggest to users that they have finished the article. To mitigate this, you may wish to wrap the content in an [`aside` ARIA landmark](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/complementary.html) or include a ["skip link"](https://www.w3.org/TR/WCAG20-TECHS/G1.html), giving users the option to skip back to the main body before the assistive technology reads the full content of the interjection.

