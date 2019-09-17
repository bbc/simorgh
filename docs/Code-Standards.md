# Code Standards

## Documentation index
Please familiarise yourself with our:
- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md) (you are here)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)

## Overarching code standards
- We are following an [AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/)-first approach therefore all page components must be AMP compatible. [Example of component with AMP Compatibility](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-image) – the component is included in an AMP page and passes AMP validation.

- We never reflow page layout, i.e. we always reserve vertical space and never change the height of elements during the render of the page. This means users never have their reading experience ruined by jumping content. NB interactive elements can still expand, but should not where they'd not be expected to expand e.g. on clicking a play icon on an audio or video player.

- We only support JavaScript (JS) enabled devices, i.e. we no longer support no-JS fallbacks. Exceptions for accessibility of primary content (which is why we Server-Side Render) are present. We do sometimes do trivial fallbacks to make the no-JS experience nicer, but this should just ask the user to turn on JS.

## Quality Assurance

We have code maintainers across our repos ([Simorgh](https://github.com/bbc/simorgh)/[Psammead](https://github.com/bbc/psammead)), who are responsible for ensuring the quality of the code and are a good source for enquiries.

### Issue/PR(Pull Request)

- Each PR should be related to an issue.

- Each issue should be refined by the responsible pod/team before work on a PR is started.

- Each PR needs review by at least one code maintainers and by 2 engineers in total.

### Unit Tests

- Unit testing is a mixture of Jest snapshot testing and enzyme assertion testing.

- We push automated testing as far down the testing pyramid as possible. This means that if something can be tested via unit tests, to ensure we have a test coverage of > 80% on this repo.

- For strictly **presentational** components Snapshots tests must be present and assertion testing is desirable.

- For **containers** or otherwise logic handling code snapshot testing is not desirable and assertion testing is mandatory.

### Linting standard

A combination of the [Airbnb Styleguide](https://github.com/airbnb/javascript/tree/master/react) and [Prettier](https://github.com/prettier/prettier) is used as our linting standards.

### Automated Processes

- Linting for code
- AMP validation for pages
- BBC a11y validation for pages
- Lighthouse validation
- Code Climate Quality tests

### Manual Processes

- If latest has a broken build, stop what you are doing and fix it.
- Code reviews take precedence over implementation
- Accessibility swarms and UX reviews are required for all front-end components

### Guideline Exceptions

The coding standards are only guidelines and exceptions can be considered depending on the case.

Examples of exceptions:

- Code duplications warnings from Code Climate should be considered on a case-by-case basis (Readability > DRY).

- If you have paired on a PR, this can include the person paired with but the reviewer must be a code maintainer

- Alpha components do not require an immediate accessibility swarm or UX review.

## Release guidelines aka non-functional requirements (NFRs) for release

### Before Merge

Unit Testing:
- Sufficient unit test coverage for any new feature, route or page type
- A11y tests/swarms (cannot go live on www.bbc.com) without this (this would be ideal but not required at this stage)
Documentation:
- Any doc updates/ new documentation for a given page type/feature
E2E Testing:
- E2E service config added for a new service/updated for an existing service
- E2E should be updated and running against localhost and disabled for test and live
Promoting to test (www.test.bbc.com):
- All of the above
- Any new data endpoints need to be available on test (speak to core pod about enabling these)
- Raise an issue in the is-infra repo requesting the STM change for going to test
- Ensure any new page type is being tested by lighthouse
Once on test:
- E2E config must be updated immediately to ensure the e2e’s are running against the test environment

### Only applicable to BBC staff:

#### Promoting to Stage:
- All of the above
- Raise an issue in the is-infra repo requesting the STM change for going to stage

#### Promoting to Live:
- All of the above
- No outstanding a11y issues/swarms/tests (these will block going live)
- Raise an issue in the is-infra repo requesting the STM change for going to live
