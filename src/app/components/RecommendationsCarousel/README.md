# Recommendations carousel

Displays the article's existing recommendations as horizontally scrollable
portrait cards, with headline overlays and the portrait video carousel's
navigation controls. Selecting a card opens a modal containing the image,
headline and a link to read the article; it does not play video. The modal
supports Escape to close, traps focus and returns focus to the selected card.

Available only on canonical Mundo article pages in local and test environments,
including Storybook. It appears after the article body, immediately before topic
discovery, and is hidden while the article is collapsed. Existing mid-article
recommendations are unchanged. No additional data request is made.

Images are cropped to 9:16. Recommendations without images use the service's
default image. Headlines remain visible in full, including for longer titles.
