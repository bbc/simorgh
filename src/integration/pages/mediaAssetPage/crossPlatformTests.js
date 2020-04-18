import { runCommonCrossPlatformTests, runMediaPlayerTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerTests();

  it('I can see the headline', () => {
    const headlineEl = document.querySelector('h1[id="content"]');

    expect(headlineEl).toBeInTheDocument();
    expect(headlineEl.textContent).toBeTruthy();
    expect(headlineEl.textContent).toMatchInlineSnapshot(
      `"Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >"`,
    );
  });

  it('I can see the timestamp', () => {
    const timestampEl = document.querySelector('time');

    expect(timestampEl).toBeInTheDocument();
    expect(timestampEl.textContent).toBeTruthy();
    expect(timestampEl.textContent).toMatchInlineSnapshot(
      `"13 September 2019"`,
    );
  });

  const bulletedListEl = document.querySelector('main ul[role="list"]');

  if (bulletedListEl) {
    it('I can see the bulleted list item', () => {
      expect(bulletedListEl).toBeInTheDocument();
      expect(bulletedListEl.textContent).toBeTruthy();
      expect(bulletedListEl.textContent).toMatchInlineSnapshot(
        `"<Media Asset Page><Media Asset Page><Media Asset Page>this is the link textthis is the link textthis is the link text"`,
      );
    });
  }

  const releatedContentEl = document.querySelector('section [role="list"]');

  if (releatedContentEl) {
    it('I can see the related content', () => {
      expect(releatedContentEl).toBeInTheDocument();
      expect(releatedContentEl.textContent).toBeTruthy();
      expect(releatedContentEl.textContent).toMatchInlineSnapshot(
        `"Police Arrest 3 ontop Anambra Church AttackGovernor Willie Obiano of Anambra State bin don promise say government go handle the matter sharp, sharp8th August 2017Lagos 'Gay' men Appear for Court, say Dem no dey GuiltyThe men wey dem arrest almost one week ago don say dem no dey guilty, as court order dem to go for sexual rehabilitation.8th August 2017Image gallery, Kenya Elections Pictures: 8 August 2017This na some of the picture wey our eye see as Kenya people go vote for election today8th August 20170:15Audio, BBC News Pidgin One Minute News, 0,15All di local and world tori wey you suppose know in 60 seconds!17th August 2017"`,
      );
    });
  }
};
