# Code Standards

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md) (you are here)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Guide to Code Reviews](https://github.com/bbc/simorgh/blob/latest/docs/Code-Reviews.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [GPG Signing Guide](docs/GPG-Signing-Guide.md)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)

NB there is further documentation colocated with relevant code. The above list is an index of the top-level documentation of our repo.

## Overarching principles

- We are following an [AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/)-first approach therefore all page components must be AMP compatible. [Example of component with AMP Compatibility](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-image) – the component is included in an AMP page and passes AMP validation.

- We never reflow page layout, i.e. we always reserve vertical space and never change the height of elements during the render of the page. This means users never have their reading experience ruined by jumping content. NB interactive elements can still expand, but should not where they'd not be expected to expand e.g. on clicking a play icon on an audio or video player.

- We only support JavaScript (JS) enabled devices, i.e. we no longer support no-JS fallbacks. Exceptions for accessibility of primary content (which is why we Server-Side Render) are present. We do sometimes do trivial fallbacks to make the no-JS experience nicer, but this should just ask the user to turn on JS.

- Readability is better than Don't Repeat Yourself (DRY) code. This is especially true in our end-to-end tests where we try to keep the tests (not the logic of how they're run) as simple as possible).

- Smaller PRs are better, and it's much better for visibility if you open your PRs as draft PRs as early as possible.

- Documentation should be colocated with code wherever possible, and should always be updated. This means having inline comments, or README.md files at the base of the directory where we believe they are helpful. The priority is light-touch documentation, this helps ensure that our documentation is easy to keep up-to-date.

## Automated Processes

- Linting of our code: A combination of the [Airbnb Styleguide](https://github.com/airbnb/javascript/tree/master/react) and [Prettier](https://github.com/prettier/prettier) is used as our linting standards.
- Issue and PR templates should be followed, then refined by the relevant internal BBC team. We have no templates for hot-fixes which are what we call live and default branch patches; in such cases maximum speed of work is the priority.
- Most PRs will require code owner approval. This requirement and its enforcement is entirely automated. We have code maintainers across our repos ([Simorgh](https://github.com/bbc/simorgh)/[Psammead](https://github.com/bbc/psammead)), who are responsible for ensuring the quality of the code and are a good source for enquiries.
- AMP validation for pages
- BBC a11y validation for pages
- Lighthouse validation
- Code Climate Quality tests

## Manual Processes

- Open your PRs as early as possible, as draft PRs.
- Add your issues and PRs to the project "Simorgh".
- Add labels to your issues and PRs to identify which stream of work they relate to; if in doubt use "simorgh-core-stream".
- If you have paired on a PR you should co-author commits.
- If latest has a broken build, stop what you are doing and fix it.
- Code reviews take precedence over implementation.
- Accessibility swarms and UX reviews are required for all front-end components - although they are optional for components with alpha version numbers.
- Refinement of GitHub issues should be done by the most relevant BBC team.

## Merging guidelines and Non-Functional Requirements (NFRs) for release

### Before Merge

#### Unit Testing:

- Unit testing is a mixture of Jest snapshot testing and enzyme assertion testing.
- We push automated testing as far down the testing pyramid as possible. This means that if something can be tested via unit tests, to ensure we have a test coverage of > 80% on this repo.
- For strictly **presentational** components Snapshots tests must be present and assertion testing is desirable. Such types of components should be created in our [component library](https://github.com/bbc/psammead) not in the Simorgh repo.
- For **containers** or otherwise logic handling code snapshot testing is not desirable and assertion testing is mandatory.
- A11y tests/swarms (this would be ideal but not required at this stage)

#### Documentation:

- Any documentation updates and new documentation for a given page type or feature should be added in the PR that makes the changes.

#### E2E Testing:

- E2E tests are mandatory for all routes.
- E2E service configuration must added for a new service/updated for an existing service
  - If for a new route that isn't promoted to other environments (see headings below) E2Es must run against localhost only, so you need to disable the testing in the test and live environments.
  - Do not add smoke testing unless it is absolutely necessary. You should consult at least one code owner when you do, as it increases CI runtime greatly.

### Only applicable to BBC staff

#### Promoting to test (www.test.bbc.com):

- Manually check all requirements for merge have been met.
- Ensure any new page type is being tested by a11y and lighthouse.
- Any new data endpoints need to be available on test (speak to core pod about enabling these).
- Raise an issue to request the traffic manager (STM) change for going to test in the [simorgh-infrastructure repo](https://github.com/bbc/simorgh-infrastructure/). Note, this is a private repo only accessible to BBC staff.

##### Once on test:

- E2E config must be updated immediately to ensure the e2e’s are running against the test environment.
- Update these wiki pages: [Simorgh Pages](https://github.com/bbc/simorgh/wiki/Simorgh-Pages) and [Simorgh Routing](https://github.com/bbc/simorgh/wiki/Simorgh-Routing).

#### Promoting to Stage:

- Manually check all requirements for merge have been met.
- Raise an issue in the is-infra repo requesting the STM change for going to stage.

##### Once on Stage:

- Update these wiki pages: [Simorgh Pages](https://github.com/bbc/simorgh/wiki/Simorgh-Pages) and [Simorgh Routing](https://github.com/bbc/simorgh/wiki/Simorgh-Routing).

#### Promoting to Live:

- Manually check all requirements for merge have been met.
- No outstanding a11y issues/swarms/tests (these will block going live).
- Ensure the page's lighthouse tests pass on test.bbc.com.
- Raise an issue in the is-infra repo requesting the STM change for going to live.

##### Once on Live:

- E2E config must be updated immediately to ensure the e2e’s are running against the test environment.
- Update these wiki pages: [Simorgh Pages](https://github.com/bbc/simorgh/wiki/Simorgh-Pages) and [Simorgh Routing](https://github.com/bbc/simorgh/wiki/Simorgh-Routing).
