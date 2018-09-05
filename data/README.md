# Simorgh Data Samples

These are a set of data samples which represent possible input to Simorgh from upstream systems (and ultimately from a CMS). They cover a number of scenarios, most of which are made up with random Lorem Ipsum or real text.

Scenarios are divided into 'test' and 'prod' - those in prod are based on real articles that were published on the BBC News website, and are considered safe content to use in the production environment.

The following scenarios are intended to represent failures - where we would potentially reject the articles as being malformed:
* 10 - subheading before headline, ends with subheading
* 14 - consecutive subheadings
* 15 - consecutive headlines, multiple headlines
* 18 - subheading before headline
* 19 - subheading before headline
* 21 - no headline
* 24 - headline only

Scenario 23 represents an article which has been withdrawn.

| Scenario | Metadata | Content | Tagging | Notes |
|---------:|----------|---------|---------|-------|
| 1        | Ordinary | Headline, Text (1 par) | None | |
| 2        | Ordinary | Headline, Image (portrait, caption), Text (2 pars, superscript) | One tag, no topics | |
| 3        | Ordinary | Headline, Video (caption), Text (3 pars, subscript) | Two tags, one topic (person) | |
| 4        | Ordinary | Headline, Text (1 par), Image, Text (1 par), Video (caption), Text (4 pars) | Two tags, two topics (place & person) | |
| 5        | Ordinary | Headline, Text (1 par), Image (caption), Video (caption), Image | Two tags, two topics (event & place) | |
| 6        | Ordinary | Headline, Text (1 par, external link), Video (caption), Image (caption) | 5 tags, 3 topics (person & 2 events) | |
| 7        | Category: Opinion | Text (1 par), Headline, Text (2 pars, internal link), Subheading, Text (1 long par) | Four tags, four topics (2 people, 2 places) | Will fail in v1.0 |
