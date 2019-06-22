# Cypress tests best practices
## Dos

- Keep it simple:
-- The shorter the better, but use as few files as possible for a test so it's as easy as possible to understand.

## Don'ts

- Don't create custom helpers without checking cypress functionality. For example, don't create a response code helper, cypress handles this by deafult. It might not look so tidy, but it works and we shouldn't be trying to tidy up the test framework for purely presentational purposes.
