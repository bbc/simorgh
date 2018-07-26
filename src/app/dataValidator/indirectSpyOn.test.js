const myModule = require('./indirectSpyOn');

test('indirectly call play function', () => {
  const fooSpy = jest.spyOn(myModule, 'foo');
  myModule.bar();

  expect(fooSpy).toHaveBeenCalledWith(true);
});
