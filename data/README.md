# Simorgh Data Samples

These are a set of data samples which represent possible input to Simorgh from upstream systems (and ultimately from a CMS). They cover a number of scenarios, most of which are made up with random Lorem Ipsum or real text.

Scenarios are divided into 'test' and 'prod' - those in prod are based on real articles that were published on the BBC News website, and are considered safe content to use in the production environment.

Several scenarios are deliberately written to fail in version 1.0.

Unless otherwise specified, metadata is Home: News, Category: News, Genre: none

| Scenario | Metadata | Content | Tagging | Notes |
|---------:|----------|---------|---------|-------|
| 1        | | Headline, Text (1 par) | None | |
| 2        | | Headline, Image (portrait, caption), Text (2 pars, superscript) | One tag, no topics | |
| 3        | | Headline, Video (caption), Text (3 pars, subscript) | Two tags, one topic (person) | |
| 4        | | Headline, Text (1 par), Image (tall landscape), Text (1 par), Video (caption), Text (4 pars) | Two tags, two topics (place & person) | |
| 5        | | Headline, Text (1 par), Image (caption), Video (caption) | Two tags, two topics (event & place) | |
| 6        | | Headline, Text (1 par, external link), Video (caption), Image (portrait, caption) | 5 tags, 3 topics (person & 2 events) | |
| 7        | Category: Opinion | Text (1 par), Headline, Text (2 pars, internal link), Subheading, Text (1 long par) | Four tags, four topics (2 people, 2 places) | Will fail in v1.0 - blocks before headline |
| 8        | Category: Opinion | Image (caption), Headline, Subheading, Image (caption), Subheading, Text (bold) | 7 about tags (events - 5 topics), 3 mentions tags | Will fail in v1.0 - blocks before headline |
| 9        | Category: Opinion | Video, Headline, Subheading, Video, Subheading, Text (bold and italic) | 6 tags, 5 topics (people, places, themes) | Will fail in v1.0 - blocks before headline |
| 10       | | Subheading, Headline, Text (3 pars), Subheading | 5 tags, 5 topics (4 places, 1 theme) | Will fail in v1.0 - subheading before headline, ends with subheading |
| 11       | Category: Opinion | Text (1 par), Image (caption), Headline, Text, Text, Text, Text (inline links) | 10 tags, 10 topics | Consecutive text blocks.  Will fail in v1.0 - blocks before headline |
| 12       | Category: Review; Genre: Business | Text (1 par), Video, Headline, Image (caption), Image (caption), Image (wide), Image (caption) | Lots of tags/topics | Will fail in v1.0 - blocks before headline |
| 13       | Category: Feature; Genre: Business | Text (1 par), Image (caption), Video, Headline, Video (caption), Video (caption), Video, Video | 2 tags, 2 topics (event, theme) | Will fail in v1.0 - blocks before headline |
| 14       | Genre: Politics | Image (caption), Text (3 pars, 1 empty), Headline, Subheading, Text (1 par), Text (1 par), Text (2 pars), Subheading, Subheading, Text (1 par, internal link) | 1 tag, 1 topic (event) | Will fail in v1.0 - consecutive subheadings|
| 15       | | Image (small, caption), Video (caption), Headline, Headline, Headline, Headline | None | Will fail in v1.0 - consecutive headlines, multiple headlines |
| 16       | Category: Feature | Video, Text (2 pars), Headline, Subheading, Image (wide), Text (1 par), Subheading, Image, Text (3 pars, Subheading, Image, Text (1 par), Subheading, Image (caption), Text (2 pars) | None | Will fail in v1.0 - blocks before headline |
| 17       | Category: Analysis | Video, Image, Headline, Text (4 pars), Subheading, Text (4 pars), Video, Text (1 par), Subheading, Text (2 pars), Image (caption), Text (1 par), Subheading, Text (2 pars), Video (caption), Text (1 par) | None | Will fail in v1.0 - blocks before headline |
| 18       | | Text (1 par), Subheading, Headline, Image, Video, Image, Subheading, Image | None | Will fail in v1.0 - subheading before headline |
| 19       | | Subheading, Text (1 par), Headline, Video | None | Will fail in v1.0 - subheading before headline |
| 20       | | Headline, Image (caption) | None | |
| 21       | Genre: Business | Subheading, Text (4 pars) | None | Will fail in v1.0 - no headline |
| 22       | | Text (1 par), Image (square, caption), Image (caption), Text (1 par), Text (1 par), Video (caption), Video (caption), Headline, Text (1 par) | None | Will fail in v1.0 - blocks before headline |
| 23       | None | None | None | Scenario 23 represents an article that has been withdrawn |
| 24       | | Headline | None | Will fail in v1.0 - headline only |
| 25       | | Headline, Image, Text (5 pars, internal link), Image, Subheading, Text (4 pars), Image (caption), Text (3 pars), Subheading, Text (1 par), Image (caption), Text (2 pars), Subheading, Image, Text (5 pars) | about: 3 tags, 3 topics (event, person, place); mentions: 3 tags, 2 topics (people) | Prod and Test |
| 26       | Home: Persian | Headline, Image (caption), Text (4 pars) | 2 tags (places) | |
| 27       | | Headline, Image (caption), Text (6 pars, internal link), Image (caption), Image (caption), Text (2 pars), Image (caption), Text (3 pars), Image (caption), Text (3 pars) | 4 tags, 4 topics (event, person, 2 places) | Prod and Test |
| 28       | Home: Persian | Headline, Image, Text (5 pars), Image (wide), Text (3 pars), Image (wide, caption), Text (3 pars) | One tag | Prod and Test |
