# Text [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=Text)

## Description

The 'Text' component is being used to parse all article story text. It takes [markdown](https://en.wikipedia.org/wiki/Markdown) as an input and converts it to the desired HTML markup. 

## When to use this component

This component is used throughout the page in visible text. It uses the [`Paragraph`](../Paragraph) styling and thus is not suitable for all text which may have different design requirements.

## Accessibility notes

This component uses `<i>` and `<b>` (rather than `<em>` and `<strong>`) for text formatting. This is because editorial use italics and bold purely for visual reasons, e.g. as the opening paragraph of the article.
	
Editorial don't want to indicate that this text has strong stress emphasis or importance, hence the use of, say, [b](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b) over [strong](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong). Screen readers should read out all text with the same intonation regardless of how it is visually presented.
