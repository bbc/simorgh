# Footer

[Storybook link](https://simorghstorybook.now.sh/?selectedKind=Footer)

## Description

The `Footer` is intended to be used at the bottom of an article. It is made up of a [`Brand banner`](https://github.com/BBC-News/simorgh/blob/footer-readme/src/app/components/Banner/index.jsx) and links to other BBC pages. These links are generally intended to be to more general and legal BBC pages, but do not have to be. It also includes information about copyright. 

Finally, the brand is hard-coded to `BBC News`, which is temprorary - see Roadmap.

## When to use this component

It is currently used at the bottom of new BBC News and BBC News Persian article pages, which is its only intended usage. It does not have to be used just on article pages/those services (but is currently hard-coded to `BBC News` in the `Banner`).

## When to not use this component

It should not be used when the brand is not `BBC News`.

## Accessibility notes

The component's parent element that it exports is a [`footer` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer), which typically contains information about the author and other connected content. The links are wrapped in a [`contentinfo` landmark](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/contentinfo.html), which denotes content around copyright, privacy and related content.

## Roadmap
- Removal of hard-coded `BBC News` brand - although this is not directly related to this component; will be done in the [Banner](https://github.com/BBC-News/simorgh/blob/footer-readme/src/app/components/Banner/index.jsx)
