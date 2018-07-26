const video = require('./indirectSpyOn');

test('indirectly call play function', () => {
  const fooSpy = jest.spyOn(video, 'foo');
  video.bar();

  expect(fooSpy).toHaveBeenCalledWith(true);
});
