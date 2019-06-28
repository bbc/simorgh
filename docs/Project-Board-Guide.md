# Simorgh Project Board Guide

Overview of a Github Project: https://help.github.com/en/articles/about-project-boards

BBC's Simorgh Project board: https://github.com/orgs/bbc/projects/20

### Overiew of each column

<!-- prettier-ignore -->
| Column Name               | Issues/PRs that belong in this column         | When to move card to the next column | Additional context |
| ------------------------- | ----------------------------------------------| ------------------------------------ |------------------- |
| To-do | Contains issues that have been newly created and added to the Simorgh project. | Once the issue has been refined to the corresponding team that has been labelled to the ticket, then it can be manually moved to the "Ready for Dev". | n/a |
| Ready for Dev | Contains issues that have been refined | Once you have selected an issue to work on, you must assign yourself to it and manually move the issue to the "Issues in progress".| n/a |
| Externally blocked | Contains issues/PRs that are blocked my an external factor | Manually move the issue/PR when it is no longer blocked | n/a |
| Issues in progress | Contains issues that are in working progress | Cards in this column will move automatically to "Done", once the PR corresponding the the issue has been merged and closed. | n/a |
| PR in progress | Contains card that have been automatically added here once a PR is assigned to the project "Simorgh". | It is your responsibility to move the card to "Code Review", when you wish for it to be reviewed by others. Teams priorities code reviews over actual development. |
| Integration testing | Contains PRs that have finished development but require Cypress tests to be written by devs or testers | Requires to be manually moved to "Code Review" once integration testing is complete | n/a |
| Code review | Contains PRs that are deemed ready to be reviewed by other developers | Once 2 other developers have approved your PR, it will automatically be moved to "Ready for test", however if your PR requires "UX, A11Y, External Review", then you will have to manually move it there. | n/a |
| UX, A11Y, External Review | Contains issues that are in progress of an accessibility swarm, UX or External review | When the reviewing party approves the PR, the card will then have to be manually moved to "Ready for test" | n/a |
| Ready for test | Contains PRs that are ready for the test engineers to test. | Once approved by a test engineer, it is their responsibility to update the PR with an approval and then the card will move to "Ready for merge" | n/a |
| Ready for merge | Contains tickets that are approved by a test engineer | If your PR has no CI (continuous integration) errors and the merge button is not disabled, then you can merge your PR and then it will automatically be moved to "Done". For cleanliness, you must also delete your branch after clicking merge. | n/a |
| Done | Contains issues that are closed and PRs that are merged. | n/a | n/a |
