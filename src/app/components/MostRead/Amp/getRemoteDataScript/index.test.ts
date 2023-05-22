import fetchMock from 'fetch-mock';
import getRemoteDataScript, { getInnerScript } from '.';
import { WesternArabic } from '../../../../legacy/psammead/psammead-locales/src/numerals';
import pidginMostRead from '../../../../../../data/pidgin/mostRead/index.json';

describe('getRemoteDataScript', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  it('getScriptContents should do stuff', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = JSON.parse(JSON.stringify(pidginMostRead));

    // eslint-disable-next-line no-eval
    console.log(eval(getInnerScript(data)));
  });
});
