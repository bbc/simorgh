# Code Standards

## Coding Approach

- We are following an AMP-first approach therefore all page components must be AMP compatible. [Example of component with AMP Compatibility](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-image) – the component is included in an AMP page and passes AMP validation.

- We never reflow page layout, i.e. we always reserve vertical space and never change the height of elements during the render of the page. This means users never have their reading experience ruined by jumping content. NB interactive elements can still expand, but not where they'd not be expected to expand e.g. on clicking a play icon on an audio or video player.

- We do not support no-JS (JavaScript) except for accessibility reasons for accessing primary content (why we do Server-Side Rendering). We do sometimes do trivial things to make the no-JS experience nicer, but this should just ask the user to turn on JS.

## Quality Assurance

We have code maintainers across our repos ([Simorgh](https://github.com/bbc/simorgh)/[Psammead](https://github.com/bbc/psammead)), who are responsible for ensuring the quality of the code and are a good source for enquiries.

#### Issue/PR(Pull Request)

- Each PR should be related to an issue.

- Each issue should be refined by the responsible pod/team before work on a PR is started.

- Each PR needs review by at least one code maintainers and by 2 engineers in total.

#### Unit Tests

- Unit testing is a mixture of Jest snapshot testing and enzyme assertion testing.

- We push automated testing as far down the testing pyramid as possible. This means that if something can be tested via unit tests, to ensure we have a test coverage of > 80% on this repo.

- For strictly **presentational** components Snapshots tests must be present and assertion testing is desirable.

- For **containers** or otherwise logic handling code snapshot testing is not desirable and assertion testing is mandatory.

#### Linting standard

A combination of the [Airbnb Styleguide](https://github.com/airbnb/javascript/tree/master/react) and [Prettier](https://github.com/prettier/prettier) is used as our linting standards.

#### Automated Processes

- Linting for code
- AMP validation for pages
- BBC a11y validation for pages
- Lighthouse validation
- Code Climate Quality tests

#### Manual Processes

- If latest has a broken build, stop what you are doing and fix it.
- Code reviews take precedence over implementation
- Accessibility swarms and UX reviews are required for all front-end components

#### Guideline Exceptions

The coding standards are only guidelines and exceptions can be considered depending on the case.

Examples of exceptions:

- Code duplications warnings from Code Climate should be considered on a case-by-case basis (Readability > DRY).

- If you have paired on a PR, this can include the person paired with but the reviewer must be a code maintainer

- Alpha components do not require an immediate accessibility swarm or UX review.
