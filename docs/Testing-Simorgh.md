# TESTING FOR ARTICLES

## **- STORY REFINEMENT**
## **- ISSUE REFINEMENT**
## **- TESTING ON LOCAL**
## **- TESTING ON TEST**

## *STORY REFINEMENT*
Story refinements sessions are with the Product Owner/Buisness Analyst, a developer and a tester. Issues will be raised off of the back of the story refinement session.
### PO/BA Role
The PO/BA will discuss the importance of the work/component that will be commencing as a result of this meeting.
### Developer Role
The developer will make notes about the technical requirements for this piece of functionality.
### Tester Role
The tester will advise what testing efforts/resources will be required.

## *ISSUE REFINEMENT*
After each stand up, two developers will discuss/flesh out the technical requirements of issues that contain the `Refinement needed` tag. Once this has been completed a third developer will sit down with a tester to discuss what testing will be required for each of the issues that were refined during the developers' Issue Refinement session.

## *TESTING ON LOCAL*
## SIMORGH

## WRITING CYPRESS TESTS
Once a developer has written their logic, a tester will checkout their branch to investigate the changes made. *To be clear, this is not testing. The PR has yet to clear Code Review.* The tester shall then branch off the developer's PR and write their Cypress tests there. Once the tests have been written, the tester's PR will go through the usual Code Review process.

## HOW TO TEST
Make sure that your version of `latest` is up to date by using `git status` and then, if necessary, `git pull`. If your branch is not up to date when you do a `git pull` your machine will pull down all the dependencies required, which is automatically then followed by an `npm install`. Once your `latest` is up to date, check out the necessary branch. Once the branch has been checked out, make sure to run `npm ci`. Once this has been completed, you can now boot up your Local environment. Here are the command required to boot up your Local enviroment.

`PROD` - `npm run build && npm run start`
`DEV` - `npm run dev`

**IMPORTANT**
Testing should be completed on the `PROD` environment.

## HOW TO RUN AUTOMATION
You do not need to have your Local environment running in order to run the automation scripts. These will work by themselves and run using a headless browser.

Cypress/Intergration Tests - `npm run test:e2e`
Unit/Snapshot Tests - `npm run test:unit`

If either of these scripts fail, speak with a developer to discuss the error(s).

## JAVELIN
As of this moment, we do not have a Javelin equivalent setup for testing on mobile devices/other desktops.

We currently have two production articles for testing:
Article 1 - http://localhost:7080/news/articles/c85pqyj5m2ko
Article 2 - http://localhost:7080/news/articles/c9rpqy7pmypo

These are the AMP variants of these articles:
- Article 1 - http://localhost:7080/news/articles/c85pqyj5m2ko.amp
- Article 2 - http://localhost:7080/news/articles/c9rpqy7pmypo.amp

Local testing is done using fixture data. However, your Local environment can be pointed to `TEST` and `LIVE` data.

## COMMANDS TO POINT TO NON-LOCAL ENVIRONMENTS
- `TEST` - `npm run build && APP_ENV=test npm run start`
- `LIVE` - `npm run build && APP_ENV=live npm run start`

## LIGHTHOUSE
Lighthouse is a performance testing tool, which we have installed. In order to run Lighthouse you *will* need to have your Local environment running in a seperate tab to the one that runs the Lighthouse script.

## HOW TO RUN LIGHTHOUSE FOR LOCAL
- In one tab, run the following command: `npm run build && npm run start`
- Once your Local environment has booted up, open a seperate tab and run `npm run lighthouse`
- Firefox will automatically open. Lighthouse tests will run and a report will be generated in the browser

## PSAMMEAD
The current testing on Psammead on your Local environment is mainly for checking that styles are loaded as expected and that breakpoints, which can be found on Zeppelin, are as expected. As Psammead is displaying components via an iframe, Articles have agreed that the browser/device testing should take place once each component has been intergrated into Simorgh.

## HOW TO TEST
Make sure that your version of `latest` is up to date by using `git status` and then, if necessary, `git pull`. If your branch is not up to date when you do a `git pull`. Once your `latest` is up to date, check out the necessary branch. Once the branch has been checked out, make sure to run `npm run install:packages `. Once this has been completed, you can now boot up your Local environment. Once you've ran the command in Terminal, Storybook will open Firefox automatically. Here is the command required to boot up your Local enviroment.

- Storybook - `npm run storybook`

The current break points are:
- 375px
- 600px
- 768px
- 1008px
- 1280px 

## *TESTING ON TEST*
## SIMORGH
The Test environment in its current form is a hybrid of PAL's Test and Stage environment. It allows us to get a better understanding of how our changes will affect performance and it's also the first time the developer's logic will have intergrated with data requested from Mozart/Ares. As this is on Test, you will not be required to spin up any environments.

These are the Test assets:
- Article 1 - http://www.test.bbc.co.uk/news/articles/c85pqyj5m2ko
- Article 2 - http://www.test.bbc.co.uk/news/articles/c9rpqy7pmypo

These are the AMP Test assets:
- Article 1 - http://www.test.bbc.co.uk/news/articles/c85pqyj5m2ko.amp
- Article 2 - http://www.test.bbc.co.uk/news/articles/c9rpqy7pmypo.amp
