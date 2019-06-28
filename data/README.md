# Simorgh Data Samples

These are a set of data samples which represent possible input to Simorgh from upstream systems (and ultimately from a CMS). They cover a number of scenarios, most of which are made up with random Lorem Ipsum or real text.

Scenarios are divided into 'test' and 'prod' - those in prod are based on real articles that were published on the BBC News website, and are considered safe content to use in the production environment.

Unless otherwise specified, metadata is Home: News, Category: News, Genre: none

<!--prettier-ignore-->
| Scenario | Metadata | Content | Tagging | Notes |
|---------:|----------|---------|---------|-------|
| 1        | | Headline, Text (1 par) | None | |
| 2        | | Headline, Image (portrait, caption), Text (2 pars, superscript) | One tag, no topics | |
| 3        | | Headline, Video (caption), Text (3 pars, subscript) | Two tags, one topic (person) | |
| 4        | | Headline, Text (1 par), Image (tall landscape), Text (1 par), Video (caption), Text (4 pars) | Two tags, two topics (place & person) | |
| 5        | | Headline, Text (1 par), Image (copyright) (caption), Text (1 par), Image (copyright), Text (1 par), Video (caption) | Two tags, two topics (event & place) | |
| 6        | | Headline, Text (1 par, external link), Video (caption), Image (portrait, caption) | 5 tags, 3 topics (person & 2 events) | |
| 7        | Category: Opinion | Text (1 par), Headline, Text (2 pars, internal link), Subheadline, Text (1 long par) | Four tags, four topics (2 people, 2 places) | |
| 8        | Category: Opinion | Image (caption), Headline, Subheadline, Image (caption), Subheadline, Text (bold) | 7 about tags (events - 5 topics), 3 mentions tags | |
| 9        | Category: Opinion | Video, Headline (italic), Subheadline, Video, Subheadline (italic), Text (bold and italic) | 6 tags, 5 topics (people, places, themes) | |
| 10       | | Subheadline, Headline, Text (3 pars), Subheadline | 5 tags, 5 topics (4 places, 1 theme) | |
| 11       | Category: Opinion | Text (1 par), Image (caption), Headline, Text, Text, Text, Text (inline links) | 10 tags, 10 topics | Consecutive text blocks. |
| 12       | Category: Review; Genre: Business | Text (1 par), Video, Headline, Image (caption), Image (caption), Image (wide), Image (caption) | Lots of tags/topics | |
| 13       | Category: Feature; Genre: Business | Text (1 par), Image (caption), Video, Headline, Video (caption), Video (caption), Video, Video | 2 tags, 2 topics (event, theme) | |
| 14       | Genre: Politics | Image (caption), Text (3 pars, 1 empty), Headline, Subheadline, Text (1 par), Text (1 par), Text (2 pars), Subheadline, Subheadline, Text (1 par, internal link) | 1 tag, 1 topic (event) | |
| 15       | | Image (small, caption), Video (caption), Headline, Headline, Headline, Headline | None | |
| 16       | Category: Feature | Video, Text (2 pars), Headline, Subheadline, Image (wide), Text (1 par), Subheadline, Image, Text (3 pars, Subheadline, Image, Text (1 par), Subheadline, Image (caption), Text (2 pars) | None | |
| 17       | Category: Analysis | Video, Image, Headline, Text (4 pars), Subheadline, Text (4 pars), Video, Text (1 par), Subheadline, Text (2 pars), Image (caption), Text (1 par), Subheadline, Text (2 pars), Video (caption), Text (1 par) | None | |
| 18       | | Text (1 par), Subheadline, Headline, Image, Video, Image, Subheadline, Image | None | |
| 19       | | Subheadline, Text (1 par), Headline, Video | None | |
| 20       | | Headline, Image (caption) | None | |
| 21       | Genre: Business | Subheadline, Text (4 pars) | None | |
| 22       | | Text (1 par), Image (square, caption), Image (caption), Text (1 par), Text (1 par), Video (caption), Video (caption), Headline, Text (1 par) | None | |
| 23       | None | None | None | Scenario 23 represents an article that has been withdrawn |
| 24       | | Headline | None | |
| 25       | | Headline, Image, Text (5 pars, internal link), Image, Subheadline, Text (4 pars), Image (caption), Text (3 pars), Subheadline, Text (1 par), Image (caption), Text (2 pars), Subheadline, Image, Text (5 pars) | about: 3 tags, 3 topics (event, person, place); mentions: 3 tags, 2 topics (people) | Prod and Test |
| 26       | Home: Persian | Headline, Image (caption), Text (4 pars) | 2 tags (places) | |
| 27       | | Headline, Image (caption), Text (6 pars, internal link), Image (caption), Image (caption), Text (2 pars), Image (caption), Text (3 pars), Image (caption), Text (3 pars) | 4 tags, 4 topics (event, person, 2 places) | Prod and Test |
| 28       | Home: Persian | Headline, Image, Text (5 pars), Image (wide), Text (3 pars), Image (wide, caption), Text (3 pars) | One tag | Prod and Test |
| 29       | Home: News | Headline (Image), Subheadline (Video), Text (1 par), Subheadline (Image), Text (1 par)| | |
| 30       | Home: News | Headline, Text (1 para), Subheadline, Video (landscape) | No tags | Test |
| 31       | Home: News | Headline, Text (1 para), Subheadline, Video (portrait) | No tags | Test |
| 32       | Home: News | Headline, Subheadline, Video, Subheadline, Audio | No tags | Test |
| 33       | Home: News | Headline, Subheadline, Video, Subheadline, Video, Subheadline, Video, Subheadline, Video | No tags | Test |
| 34       | Home: News | Headline, Subheadline, Video, Subheadline, Video, Subheadline, Video, Subheadline, Video, Subheadline, Audio, Subheadline, Audio, Subheadline, Audio | No tags | Test |

## Video test assets

All these are included in article cmejqde986vo on the Test environment

|      PID | Availability  |
| -------: | ------------- |
| p01k6msm | International |
| p01kdbwr | International |
| p01kdbns | UK            |
| p01kdbpz | Ex-UK         |
