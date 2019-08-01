# Simorgh Project Board Guide

Overview of a Github Project: https://help.github.com/en/articles/about-project-boards

BBC's Simorgh Project board: https://github.com/orgs/bbc/projects/20

## Documentation index
Please familiarise yourself with our:
- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md) (you are here)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)

### Overiew of each column

<!-- prettier-ignore -->
| Column Name               | Issues/Pull Requests that belong in this column | When to move card to the next column | Additional context |
| ------------------------- | ------------------------------------------------| ------------------------------------ |------------------- |
| To-do | Contains issues that have been newly created and added to the Simorgh project. | Once the issue has been refined to the corresponding team that has been labelled to the issue, then it can be manually moved to "Ready for Dev". | n/a |
| Ready for Dev | Contains issues that have been refined. | Once you have selected an issue to work on, you must assign yourself to it and manually move the issue to the "Issues in progress".| n/a |
| Externally blocked | Contains issues/PRs that are blocked by an external factor. | Manually move the issue/PR when it is no longer blocked. | n/a |
| Issues in progress | Contains issues that are in working progress. | If the PR that uses a [keyword to link the issue](https://help.github.com/en/articles/closing-issues-using-keywords) has been merged, then the cards in this column will move automatically to "Done". | PRs should not use keywords unless they definitely complete the entire issue. |
| PR in progress | Contains cards that have been automatically added here once a PR is assigned to the project "Simorgh". | It is your responsibility to move the card to "Code Review", when you wish for it to be reviewed by others. Teams prioritise code reviews over actual development. | PRs should be created on first commit, so that the team can see what you are working on. |
| Code review | Contains PRs that are deemed ready to be reviewed by other developers. | Once 2 other developers have approved your PR, it will automatically be moved to "Ready for test", however if your PR requires "UX, A11Y, External Review", then you will have to manually move it there. | If you had paired with someone on an issue, then one participant can be the reviewer but the 2nd reviewer must be a code maintainer. |
| UX, A11Y, External Review | Contains issues that are in progress of an accessibility swarm, UX or External review. | When the reviewing party approves the PR, the card will then have to be manually moved to "Ready for test". | [Read more about accessibility swarm](https://bbc-news.github.io/accessibility-news-and-you/accessibility-swarms) |
| Ready for test | Contains PRs that are ready for the test engineers to test. | Once approved by a test engineer, it is their responsibility to update the PR with an approval and then the card will move to "Ready for merge". | n/a |
| Ready for merge | Contains tickets that are approved by a test engineer. | If your PR has no CI (continuous integration) errors and the merge button is not disabled, then you can merge your PR and then it will automatically be moved to "Done". For cleanliness, you must also delete your branch after clicking merge. | n/a |
| Done | Contains issues that are closed and PRs that are merged. | n/a | n/a |
