import getInitialData from '.';

it('should resolve with status 200 and errorCode', async () => {
  const expected = { status: 200, errorCode: 404 };
  const actual = await getInitialData('/pidgin/404');

  expect(expected).toEqual(actual);
});
