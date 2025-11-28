# Coding Challenge

Hi Software Engineering candidate!

This challenge is all about working within a mature codebase and extending existing functionality with an enhancement.

In [this PR](https://github.com/bbc/simorgh/pull/13485) you will see a working local implementation of an offline page implemented with our Service Worker. The intent of this is to give a better experience to our users when offline but it doesn't offer anything for them to do whilst offline.

Your challenge is to extend this implementation to store five articles for offline consumption. You will extend the offline page to include links to these articles and these articles will successfully load when offline.

A selection of articles to use can be found here: https://github.com/bbc/simorgh/tree/latest/data/pidgin/articles 

These will render if you visit http://localhost:7080/pidgin/{articleId} e.g. http://localhost:7080/pidgin/articles/c1j5mz19jdko 

## Executing the offline page
This can be reliably demonstrated in the Google Chrome browser (other browsers do not make it as easy to test offline behaviour like this), please follow these instructions:

1. Open a locally available article e.g. http://localhost:7080/pidgin/articles/crjrrv61e5po
2. In 'Dev Tools', click the network tab and choose offline mode.
3. Refresh the page and see the offline page experience as currently implemented.

## Guidance
- Don't worry about translations, the solution can be implemented in English
- Please feel free to use Coding Assistants to support your development of the solution though we do ask you do not allow an agent to take on the entire task for you. You will need to explain the decisions you have made and that includes how you interacted with any AI tech you used to build your solution.
- Please fork our repo into your own github account and produce a PR into your fork showing your solution for us to review before we provide feedback. Your PR should target the `ab-offline-test` branch so building upon the initial PR provided.
- Try not to spend more than 3 hours on your solution, a working solution is not essential, we want to see how you have approached your solution as much as any working functionality.

Good luck and have fun!
