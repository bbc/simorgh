# Simorgh Data Samples

These are a set of data samples which represent possbile input to Simorgh from upstream systems (and ultimately from a CMS).  They cover a number of scenarios, most of which are made up with random Lorem Ipsum or real text.

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