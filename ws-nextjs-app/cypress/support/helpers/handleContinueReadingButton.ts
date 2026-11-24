export default () => {
  const CONTINUE_READING_BUTTON_ID = '#continue-reading-button';

  cy.get('body').then($body => {
    if ($body.find(CONTINUE_READING_BUTTON_ID).length > 0) {
      cy.get(CONTINUE_READING_BUTTON_ID).then($button => {
        const buttonDisplay = window
          .getComputedStyle($button[0])
          .getPropertyValue('display');

        if (buttonDisplay !== 'none') {
          cy.get(CONTINUE_READING_BUTTON_ID).click();
        }
      });
    }
  });
};
