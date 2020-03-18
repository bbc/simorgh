import { liveRadio } from '../../pageUrls';
import { renderAsBlah } from '../../render';
import runCanonicalTests from './canonical';

liveRadio.forEach(async ({ pageId, path, enabled }) => {
  if (enabled) {
    let app;
    beforeAll(async () => {
      app = await renderAsBlah(path);
    });

    describe(`Given I am on ${pageId} page`, () => {
      console.log('app', app);
      runCanonicalTests({ app, pageId });
    });
  }
});
