const express = require('express');
const request = require('supertest');
const path = require('path');
const local = require('./index').default;

const sendFileSpy = jest.spyOn(express.response, 'sendFile');

const makeRequest = async requestPath =>
  request(local(express())).get(requestPath);

const DATA_DIRECTORY = path.join(process.cwd(), 'data');

const assertDataFile = ({ dataPath, expectedDataFile }) => {
  it(`should be served for ${dataPath}`, async () => {
    const response = await makeRequest(dataPath);
    expect(response.status).toBe(200);
    expect(
      sendFileSpy.mock.calls[sendFileSpy.mock.calls.length - 1][0],
    ).toEqual(path.join(DATA_DIRECTORY, expectedDataFile));
    sendFileSpy.mockClear();
  });
};

describe('Local Server', () => {
  describe('Article data file', () => {
    const articleDataPaths = [
      '/news/articles/c0000000001o.json',
      '/zhongwen/articles/c3xd4x9prgyo/simp.json',
    ];

    articleDataPaths.forEach(articleDataPath => {
      assertDataFile({
        dataPath: articleDataPath,
        expectedDataFile: articleDataPath,
      });
    });
  });

  describe('Front Page data file', () => {
    const frontPageDataPaths = [
      {
        dataPath: '/pidgin.json',
        expectedDataFile: '/pidgin/frontpage/index.json',
      },
      {
        dataPath: '/zhongwen/trad.json',
        expectedDataFile: '/zhongwen/frontpage/trad.json',
      },
    ];

    frontPageDataPaths.forEach(frontPageDataPath => {
      const { dataPath, expectedDataFile } = frontPageDataPath;

      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('Most Read data file', () => {
    const mostReadDataPaths = [
      {
        dataPath: '/pidgin/mostread.json',
        expectedDataFile: '/pidgin/mostRead/index.json',
      },
      {
        dataPath: '/zhongwen/mostread/trad.json',
        expectedDataFile: '/zhongwen/mostRead/trad.json',
      },
    ];

    mostReadDataPaths.forEach(mostReadDataPath => {
      const { dataPath, expectedDataFile } = mostReadDataPath;

      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('Most Watched data file', () => {
    const mostWatchedDataPaths = [
      {
        dataPath: '/pidgin/mostwatched.json',
        expectedDataFile: '/pidgin/mostWatched/index.json',
      },
      {
        dataPath: '/zhongwen/mostwatched/trad.json',
        expectedDataFile: '/zhongwen/mostWatched/trad.json',
      },
    ];

    mostWatchedDataPaths.forEach(mostWatchedDataPath => {
      const { dataPath, expectedDataFile } = mostWatchedDataPath;

      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('On Demand Radio data file', () => {
    const onDemandRadioDataPaths = [
      {
        dataPath: '/korean/bbc_korean_radio/w3ct0kn5.json',
        expectedDataFile: '/korean/bbc_korean_radio/w3ct0kn5.json',
      },
      {
        dataPath: '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw.json',
        expectedDataFile: '/afaanoromoo/bbc_afaanoromoo_radio/w13xttnw.json',
      },
    ];

    onDemandRadioDataPaths.forEach(onDemandRadioDataPath => {
      const { dataPath, expectedDataFile } = onDemandRadioDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('On Demand TV data file', () => {
    const onDemandTvDataPaths = [
      {
        dataPath: '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.json',
        expectedDataFile: '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.json',
      },
      {
        dataPath: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json',
        expectedDataFile: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json',
      },
    ];

    onDemandTvDataPaths.forEach(onDemandTvDataPath => {
      const { dataPath, expectedDataFile } = onDemandTvDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('CPS Asset data file', () => {
    const cpsAssetDataPaths = [
      {
        dataPath: '/pidgin/23248703.json',
        expectedDataFile: '/pidgin/cpsAssets/23248703.json',
      },
      {
        dataPath: '/ukchina/simp/23279012.json',
        expectedDataFile: '/ukchina/cpsAssets/simp/23279012.json',
      },
    ];

    cpsAssetDataPaths.forEach(cpsAssetDataPath => {
      const { dataPath, expectedDataFile } = cpsAssetDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('Legacy Asset data file', () => {
    const legacyAssetDataPaths = [
      {
        dataPath: '/persian/iran/2016/09/160907_tc2_testmap1.json',
        expectedDataFile:
          '/persian/legacyAssets/iran/2016/09/160907_tc2_testmap1.json',
      },
      {
        dataPath: '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1.json',
        expectedDataFile:
          '/ukchina/legacyAssets/simp/multimedia/2016/11/161104_tc2_testmap1.json',
      },
    ];

    legacyAssetDataPaths.forEach(legacyAssetDataPath => {
      const { dataPath, expectedDataFile } = legacyAssetDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('Secondary Column data file', () => {
    const secondaryColumnDataPaths = [
      {
        dataPath: '/igbo/sty-secondary-column.json',
        expectedDataFile: '/igbo/secondaryColumn/index.json',
      },
      {
        dataPath: '/ukchina/sty-secondary-column/trad.json',
        expectedDataFile: '/ukchina/secondaryColumn/trad.json',
      },
    ];

    secondaryColumnDataPaths.forEach(secondaryColumnDataPath => {
      const { dataPath, expectedDataFile } = secondaryColumnDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('Recommendations data file', () => {
    const recommendationsDataPaths = [
      {
        dataPath: '/hindi/vert-fut-53035307/recommendations.json',
        expectedDataFile: '/hindi/recommendations/index.json',
      },
    ];

    recommendationsDataPaths.forEach(recommendationsDataPath => {
      const { dataPath, expectedDataFile } = recommendationsDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  describe('IDX data file', () => {
    const idxDataPaths = [
      {
        dataPath: '/persian/afghanistan.json',
        expectedDataFile: '/persian/afghanistan/index.json',
      },
    ];

    idxDataPaths.forEach(idxDataPath => {
      const { dataPath, expectedDataFile } = idxDataPath;
      assertDataFile({
        dataPath,
        expectedDataFile,
      });
    });
  });

  it('comscore', async () => {
    const response = await makeRequest('/static/js/comscore/main-1.0.js');
    expect(response.status).toBe(200);
    expect(
      sendFileSpy.mock.calls[sendFileSpy.mock.calls.length - 1][0],
    ).toEqual(
      path.join(process.cwd(), '/public/static/js/comscore/main-1.0.js'),
    );
  });

  it('ckns_policy', async () => {
    const response = await makeRequest('/ckns_policy/test');
    expect(response.status).toBe(200);
  });
});
