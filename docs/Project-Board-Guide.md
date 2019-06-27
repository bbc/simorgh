# Simorgh Project Board Guide

Overview of a Github Project: https://help.github.com/en/articles/about-project-boards
BBC's Simorgh Project board: https://github.com/orgs/bbc/projects/20

### Definition of columns

<!-- prettier-ignore -->
| Name                      | Definition                                    | When to move card to the next column |
| ------------------------- | ----------------------------------------------| ------------------------------- |
| To-do                     | Contains issues that have been newly created and added to the Simorgh project. | Once the issue has been refined to the corresponding team that has been labelled to the ticket, then it can be manually moved to the "Ready for Dev" column. |
| Ready for Dev             | Contains issues that have been refined             | Once you have selected an issue to work on, you must assign yourself to it and manually move the issue to the "Issues in progress" column.|
| Externally blocked        |                                               |                                 |
| Issues in progress        | Contains issues that are in working progress  | Cards in this column will move automatically to "Done", once the PR corresponding the the issue has been merged and closed.                        |
| PR in progress            | A card will be automatically added here once a you assigned it to the project "Simorgh". |                                 |
| integration testing       |                                               |                                 |
| Code review               | Contains PRs that are deemed ready to be reviewed by other developers                                              | Once 2 other developers have approved your PR, it will automatically be moved to "Ready for test", however if your PR requires "UX, A11Y, External Review", then you will have to manually move it there.                             |
| UX, A11Y, External Review |                                               |                                 |
| Ready for test            | Contains PRs that are ready for the test engineers to test.                                              | Once approved by a test engineer, it is their responsibility to update the PR with an approval and then the card will move to "Ready for merge"                               |
| Ready for merge           | Contains tickets that are approved by a test engineer | If your PR has no CI (continuous integration) errors and the merge button is not disabled, then you can merge your PR and then it will automatically be moved to "Done". For cleanliness, you must also delete your branch after clicking merge.                                 |
| Done                      | Contains issues that are closed and PRs that are merged.                                          |  n/a                                 |
