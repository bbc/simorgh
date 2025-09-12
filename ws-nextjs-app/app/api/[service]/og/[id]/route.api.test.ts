/**
 * @jest-environment node
 */

import * as fetchPageData from '#app/routes/utils/fetchPageData';
import { GET as api } from './route.api';

describe('GET /api/og', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a 200 response with valid article id and service', async () => {
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 200,
      json: {},
    });

    const response = await api(
      new Request('https://www.bbc.com/pidgin/og/czjnnk9m8vdo'),
      {
        params: { id: 'czjnnk9m8vdo', service: 'pidgin' },
      },
    );

    expect(response.status).toBe(200);
  });

  it('should return a 200 response with valid live id and service', async () => {
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 200,
      json: {},
    });

    const response = await api(
      new Request('https://www.bbc.com/mundo/og/cemn2qq3x8vt'),
      {
        params: { id: 'cemn2qq3x8vt', service: 'mundo' },
      },
    );

    expect(response.status).toBe(200);
  });

  it('should return a 404 response when id is missing', async () => {
    const response = await api(
      new Request('https://www.bbc.com/pidgin/og/czjnnk9m8vdo'),
      {
        // @ts-expect-error - testing missing param
        params: { service: 'pidgin' },
      },
    );

    expect(response.status).toBe(404);
  });

  it('should return a 404 response when service is missing', async () => {
    const response = await api(
      new Request('https://www.bbc.com/pidgin/og/czjnnk9m8vdo'),
      {
        // @ts-expect-error - testing missing param
        params: { service: 'pidgin' },
      },
    );

    expect(response.status).toBe(404);
  });

  it('should return a 404 response when id is not an article or live id pattern', async () => {
    const response = await api(
      new Request('https://www.bbc.com/pidgin/og/czjnnk9m8vdo'),
      {
        params: { id: '123', service: 'pidgin' },
      },
    );

    expect(response.status).toBe(404);
  });

  it('should return a 500 response when page data fetch returns 500', async () => {
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 500,
      json: {},
    });

    const response = await api(
      new Request('https://www.bbc.com/pidgin/og/czjnnk9m8vdo'),
      {
        params: { id: 'czjnnk9m8vdo', service: 'pidgin' },
      },
    );

    expect(response.status).toBe(500);
  });
});
