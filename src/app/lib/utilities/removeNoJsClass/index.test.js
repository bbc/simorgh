import removeNoJsClass from '.';

describe('removeNoJsClass', () => {
  afterEach(() => {
    document.documentElement.className = '';
  });

  it('removes the no-js class from the document element', () => {
    document.documentElement.classList.add('no-js');

    removeNoJsClass();

    expect(document.documentElement.classList.contains('no-js')).toBe(false);
  });

  it('keeps other classes on the document element', () => {
    document.documentElement.classList.add('no-js', 'other-class');

    removeNoJsClass();

    expect(document.documentElement.className).toBe('other-class');
  });
});
