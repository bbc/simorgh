# Cypress tests best practices
## Dos

- Keep it simple:
-- The shorter the better, but use as few files as possible for a test so it's as easy as possible to understand.
-- Use custom cypress commands, see commands.js in /support

## Don'ts

- Don't create custom helpers and export them as consts, use cypress command overrides.
- Don't import helpers, you should never need to do this, if you do, comment why and doublecheck yourself. NB helpers, config is expected to be necessary.
