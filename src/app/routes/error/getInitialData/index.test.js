import getInitialData from '.';
import { errorPagePath } from '../../utils/regex';

it('should resolve with status 200 and errorCode', async () => {
  const expected = { status: 200, errorCode: 404 };
  const actual = await getInitialData(errorPagePath)({ path: '/pidgin/404' });

  expect(expected).toEqual(actual);
});
