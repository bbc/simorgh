> This document tries to describe the _why_ and the _how_ of code reviews. It does not address the _who_, the _when_ or the _what_.

Some of the advice here takes inspiration from [a blog post by Gergely Orosz](https://stackoverflow.blog/2019/09/30/how-to-make-good-code-reviews-better/).

# All about code reviews

All code merged into this repo has to be reviewed and approved by a least **two** other contributors.

Some types of changes also require that one of these approvals is from a [code owner]().

## Why?

The traditional view is that code reviews help find defects earlier in the development process, when they are easier (and therefore cheaper) to fix. While there is some [debate about how much cheaper](http://thklein.com/cost-of-defect/), code reviews _can_ catch problems early on. But they also have a number of other important benefits for the team which are sometimes forgotten, such as:

- Code improvement
- Finding alternative solutions
- Understanding
- Share code ownership
- External impact
- Knowledge transfer

Source: [a 2013 study at Microsoft](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/).

## How do I do a code review?

- Anyone can do a code review, regardless of level of seniority or experience. Nobody has a monopoly on insights, concerns or ideas.

- Not sure how to give a code review? Asking questions is a good place to start. Does something seem confusing to you? Surprising? Inconsistent? Out-of-place? Drop a question seeking clarification from the author(s).

## Where?

- GitHub is a great tool, but suffers from the same weaknesses as other types of asynchronous textual communication: it's easy to be misunderstood, and tone of voice can be difficult to convey, regardless of how many emoji we use.

- Are you finding yourself in a back-and-forth exchange of comments with a reviewer/author? Instead, suggest a call to talk it over - it will often be faster and help dispel any misapprehensions.

## Pitfalls

- PR looks too big, I'll ignore
- But code review takes so long
