/**
 * @jest-environment node
 */

import { GET as api } from './route.api';

describe('GET /api/og', () => {
  it('should return a 200 response with valid article id and service', async () => {
    const response = await api(
      new Request('https://example.com/api/og?id=cw0x29n2pvqo&service=pidgin'),
    );

    expect(response.status).toBe(200);
  });

  it('should return a 200 response with valid live id and service', async () => {
    const response = await api(
      new Request('https://example.com/api/og?id=cemn2qq3x8vt&service=mundo'),
    );

    expect(response.status).toBe(200);
  });

  it('should return a 404 response when id is missing', async () => {
    const response = await api(
      new Request('https://example.com/api/og?service=news'),
    );

    expect(response.status).toBe(404);
  });

  it('should return a 404 response when service is missing', async () => {
    const response = await api(
      new Request('https://example.com/api/og?id=some-article-id'),
    );

    expect(response.status).toBe(404);
  });

  it('should return a 404 response when id is not an article or live id pattern', async () => {
    const response = await api(
      new Request('https://example.com/api/og?id=invalid-id&service=news'),
    );

    expect(response.status).toBe(404);
  });
});
