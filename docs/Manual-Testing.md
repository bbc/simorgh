# Manual Testing

We aim to automate testing as much as possible. However, in some cases where we haven't yet implemented the automation, we need an interim manual testing strategy.


## Special characters

The CMS has an input panel with 50 glyphs of special characters, selected from a wider list based on their popularity. We need to ensure we render these characters correctly.

When there is a change to a Font implementation, or to a Heading, Caption or Text component, we should do a manual regression test of special characters. This is to ensure our changes do not affect the rendering of these characters in the browser.

This article has special characters in the headline, subheadline, caption & paragraphs:

- Test https://www.test.bbc.com/news/articles/cev804m5n0vo
- Local http://localhost.bbc.com:7080/news/articles/cev804m5n0vo

The characters should be using Reith and rendering correctly. See this screenshot:

![screenshot_2019-03-08 test article for special characters](https://user-images.githubusercontent.com/3028997/54025522-b1786980-4192-11e9-89fd-9c78ca881f8b.png)

These should be regression tested on a subset of the browsers/devices that we support.
[Browser support table](https://github.com/bbc/psammead#browser-support)

[In a future we will automate this manual process with snapshot testing.](https://github.com/bbc/simorgh/issues/1370)


