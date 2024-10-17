const express = require('express');
const request = require('supertest');
const path = require('path');
const local = require('./index').default;

const sendFileSpy = jest.spyOn(express.response, 'sendFile');

const localServer = local(express());

const makeRequest = async requestPath => request(localServer).get(requestPath);

const DATA_DIRECTORY = path.join(process.cwd(), 'data');

describe('Local Server', () => {
  beforeEach(() => {
    sendFileSpy.mockClear();
  });

  it.each`
    pageType                             | dataPath                                                         | expectedDataFile
    ${'Article'}                         | ${'/news/articles/c0g992jmmkko.json'}                            | ${'/news/articles/c0g992jmmkko.json'}
    ${'Article with variant'}            | ${'/zhongwen/articles/c3xd4x9prgyo/simp.json'}                   | ${'/zhongwen/articles/c3xd4x9prgyo/simp.json'}
    ${'Migrated Home Page with variant'} | ${'/zhongwen/trad.json'}                                         | ${'/zhongwen/homePage/trad.json'}
    ${'Migrated Home Page'}              | ${'/pidgin.json'}                                                | ${'/pidgin/homePage/index.json'}
    ${'Home Page'}                       | ${'/kyrgyz/tipohome.json'}                                       | ${'/kyrgyz/homePage/index.json'}
    ${'Most Read'}                       | ${'/pidgin/mostread.json'}                                       | ${'/pidgin/mostRead/index.json'}
    ${'Most Read with variant'}          | ${'/zhongwen/mostread/trad.json'}                                | ${'/zhongwen/mostRead/trad.json'}
    ${'On Demand Radio Brand'}           | ${'/korean/bbc_korean_radio/w3ct0kn5.json'}                      | ${'/korean/bbc_korean_radio/w3ct0kn5.json'}
    ${'On Demand Radio Episode'}         | ${'/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw.json'} | ${'/afaanoromoo/bbc_afaanoromoo_radio/w13xttnw.json'}
    ${'On Demand TV Brand'}              | ${'/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.json'}               | ${'/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.json'}
    ${'On Demand TV Episode'}            | ${'/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json'}           | ${'/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json'}
    ${'CPS Asset'}                       | ${'/pidgin/23248703.json'}                                       | ${'/pidgin/cpsAssets/23248703.json'}
    ${'CPS Asset with variant'}          | ${'/ukchina/simp/23279012.json'}                                 | ${'/ukchina/cpsAssets/simp/23279012.json'}
    ${'Legacy Asset'}                    | ${'/persian/iran/2016/09/160907_tc2_testmap1.json'}              | ${'/persian/legacyAssets/iran/2016/09/160907_tc2_testmap1.json'}
    ${'Legacy Asset with variant'}       | ${'/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1.json'}   | ${'/ukchina/legacyAssets/simp/multimedia/2016/11/161104_tc2_testmap1.json'}
    ${'Secondary Column'}                | ${'/igbo/sty-secondary-column.json'}                             | ${'/igbo/secondaryColumn/index.json'}
    ${'Secondary Column with variant'}   | ${'/ukchina/sty-secondary-column/trad.json'}                     | ${'/ukchina/secondaryColumn/trad.json'}
    ${'Recommendations'}                 | ${'/hindi/vert-fut-53035307/recommendations.json'}               | ${'/hindi/recommendations/index.json'}
    ${'Africa Eye TV Brand'}             | ${'/worldservice/tv/africa_eye/w13xttpn.json'}                   | ${'/worldservice/tv/africa_eye/w13xttpn.json'}
    ${'Africa Eye TV Episode'}           | ${'/worldservice/tv/africa_eye/p08jbbg.json'}                    | ${'/worldservice/tv/africa_eye/p08jbbg.json'}
    ${'Live Radio'}                      | ${'/korean/bbc_korean_radio/liveradio.json'}                     | ${'/korean/bbc_korean_radio/liveradio.json'}
  `(
    '$pageType data file should be served for $dataPath',
    async ({ dataPath, expectedDataFile }) => {
      const response = await makeRequest(dataPath);
      expect(response.status).toBe(200);
      expect(sendFileSpy).toBeCalled();
      expect(sendFileSpy.mock.calls[0][0]).toEqual(
        path.join(DATA_DIRECTORY, expectedDataFile),
      );
    },
  );

  it('ckns_policy', async () => {
    const response = await makeRequest('/ckns_policy/test');
    expect(response.status).toBe(200);
  });
});
