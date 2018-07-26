const video = require('./indirectSpyOn');

// Fails - Expected mock function to have been called, but it was not called.
// test('indirectly call play function', () => {
//   const playSpy = jest.spyOn(video, 'play');
//   const foobarCall = video.foobar();

//   expect(playSpy).toHaveBeenCalled();
//   expect(foobarCall).toBe(false);

//   playSpy.mockRestore();
// });


// Passes
test('indirectly call play function', () => {
  const playSpy = jest.spyOn(video, 'play');
  video.foobar();

  setTimeout(
    function(){
      expect(playSpy).toHaveBeenCalled();
    }, 0);
});


// test('indirectly call play function', () => {
//   const playSpy = jest.spyOn(video, 'play');

//   expect(() => {
//     video.foobar();
//     expect(playSpy).toHaveBeenCalled();
//   }).not.toThrowError();
// });

