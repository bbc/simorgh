import { expect, type APIRequestContext } from '@playwright/test';

const assert200HtmlResponse = async ({
  request,
  path,
  baseURL,
}: {
  request: APIRequestContext;
  path: string;
  baseURL: string;
}) => {
  const response = await request.get(`${baseURL}${path}`);
  const contentType = response.headers()['content-type'] || '';

  expect(response.status()).toBe(200);
  expect(contentType).toContain('text/html');
};

export default assert200HtmlResponse;
