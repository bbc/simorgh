# Visually Hidden Text [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=VisuallyHiddenText)

### Description
Adds non-visible text to the page, to be utilised by screen-readers and other assistive technology.

### When to use this component
Visually hidden text should be used to augment any component which relies on visual aids or styling to communicate its purpose.

For example, the [Image Caption](../Figure/Caption) or [Copyright](../Figure/Copyright) components may both seem obvious in purpose when viewed on a page, but the contents of such components could be jarring or confusing when immediately spoken out following the alt-text of an image. As a result, both utilise this component to provide additional context before reading their main text content.

Similarly, any component which utilises a static image or SVG depicting text should use this component to communicate the text contained in the image to screen readers. An example of doing this is seen in the [Header component](../Header).

### When not to use this component
Avoid using this component with text that would cause unnecessary repetition. For example, there is no need to add VisuallyHiddenText stating "Image" next to an `img` tag, as most assistive tech already explicitly communicates the presence of an image, and this would likely only prove confusing or irritating to users.

Similarly, when adding hidden text that will occur partway through an article, avoid using phrases that may imply that the main body is over. Suddenly hearing a phrase like "Read more on ___" may suggest to users that they have finished the article. To mitigate this, you may wish to include an [`aside` ARIA landmark](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/complementary.html) or a ["skip link"](https://www.w3.org/TR/WCAG20-TECHS/G1.html), which gives users the option to skip back to the main body before the assistive technology reads the full content of the interjection.