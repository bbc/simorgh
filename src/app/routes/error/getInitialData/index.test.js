import getInitialData from '.';
import { errorPagePath } from '../../utils/regex';

it('should resolve with status 200 and errorCode', async () => {
  const expected = {
    status: 200,
    errorCode: 404,
    pageData: { metadata: { type: 'error' } },
  };
  const actual = await getInitialData(errorPagePath)({ path: '/pidgin/404' });

  expect(expected).toEqual(actual);
});

it('should resolve with status 200 and errorCode with 404 if pathRegex is null', async () => {
  const expected = {
    status: 200,
    errorCode: 404,
    pageData: { metadata: { type: 'error' } },
  };
  const actual = await getInitialData(null)({ path: '/pidgin/400' });

  expect(expected).toEqual(actual);
});

it('should resolve with status 200 and errorCode with 404 if pathRegex and pathName is null', async () => {
  const expected = {
    status: 200,
    errorCode: 404,
    pageData: { metadata: { type: 'error' } },
  };
  const actual = await getInitialData(null)({ path: null });

  expect(expected).toEqual(actual);
});
