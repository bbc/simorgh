import getPageData from '../../../utilities/pageRequests/getPageData';
import getSinceLastVisitedData, {
  clearSinceLastVisitedCache,
} from './getSinceLastVisitedData';

jest.mock('../../../utilities/pageRequests/getPageData');

const URN = 'urn:bbc:vivo:curation:3f2c9a1e-1111-2222-3333-444455556666';
const props = { service: 'mundo' as const, resolvedUrl: '/mundo/articles/x' };

describe('getSinceLastVisitedData', () => {
  beforeEach(() => {
    clearSinceLastVisitedCache();
    (getPageData as jest.Mock).mockReset().mockResolvedValue({
      data: {
        status: 200,
        pageData: {
          curations: [
            { position: 0, curationId: URN, summaries: [{ id: 'a' }] },
          ],
        },
      },
    });
  });

  it('returns the top stories curation', async () => {
    expect(await getSinceLastVisitedData(props)).toEqual({
      curationId: URN,
      summaries: [{ id: 'a' }],
    });
  });

  it('reuses the result for repeated requests', async () => {
    await Promise.all([
      getSinceLastVisitedData(props),
      getSinceLastVisitedData(props),
    ]);
    await getSinceLastVisitedData(props);

    expect(getPageData).toHaveBeenCalledTimes(1);
  });

  it('returns null when the fetch fails', async () => {
    (getPageData as jest.Mock).mockRejectedValue(new Error('boom'));

    expect(await getSinceLastVisitedData(props)).toBeNull();
  });
});
