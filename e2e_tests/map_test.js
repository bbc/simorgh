Feature('Media Asset Page');

Before(I => {
  I.amOnPage('/pidgin/23248703');
});

// Article Body Content
Scenario('renders a visually hidden H1 in the MAP body', I => {
  within('main[role=main]', () => {
    I.seeElement('h1[id=content]');
  });
});

Scenario('renders a media player in the MAP body', I => {
  within('=media-player', () => {
    I.waitForElement('iframe', 5);
    I.seeElement('iframe[title="Media player"]');
  });
});

Scenario('renders a <strong> Title in the MAP body', I => {
  within('main[role=main]', () => {
    I.seeElement('strong[aria-hidden=true]');
  });
});

Scenario('renders related content', I => {
  within('=related-content', () => {
    I.seeElement('=related-content-item');
  });
});
