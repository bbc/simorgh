Feature('Article Tests');

Before(I => {
  I.amOnPage('/pidgin/articles/cwl08rd38l6o');
});

// Article Body Content
Scenario('renders a H1 in the article body', I => {
  within('main[role=main]', () => {
    I.seeElement('h1[id=content]');
  });
});

Scenario('renders a image in the article body', I => {
  within('main[role=main]', () => {
    within('figure', () => {
      I.seeElement('img');
    });
  });
});

Scenario('renders a timestamp in the article body', I => {
  within('main[role=main]', () => {
    I.seeElement('time');
  });
});

Scenario('renders a H2 in the article body', I => {
  within('main[role=main]', () => {
    I.seeElement('h2');
  });
});

Scenario('renders a paragraph in the article body', I => {
  within('main[role=main]', () => {
    I.seeElement('p');
  });
});

Scenario('renders an AV placeholder with timestamp in the article body', I => {
  within('main[role=main]', () => {
    within('=media-player', () => {
      within('button', () => {
        I.seeElement('time');
      });
    });
  });
});

Scenario('media player loads when placeholder is clicked', I => {
  within('=media-player', () => {
    I.click('button');
    I.waitForElement('iframe', 5);
    I.seeElement('iframe[title="Media player"]');
  });
});
