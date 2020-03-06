import { Then } from 'cypress-cucumber-preprocessor/steps';

const assertRelatedStoriesCount = numRelatedStories => {
  cy.get('li[class^="StoryPromoLi"]').should($relatedItems => {
    expect($relatedItems).to.have.length(numRelatedStories);
  });
};

Then('there are {int} related stories', numRelatedStories => {
  assertRelatedStoriesCount(numRelatedStories);
});

Then('there is 1 related story', () => {
  assertRelatedStoriesCount(1);
});
