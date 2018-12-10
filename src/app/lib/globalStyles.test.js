import * as styledComponents from 'styled-components';

describe('globalStyles', () => {
  it('should call createGlobalStyle with args matching snapshot', async () => {
    jest.spyOn(styledComponents, 'createGlobalStyle');

    await import('./globalStyles');

    const createGlobalStyleArgs =
      styledComponents.createGlobalStyle.mock.calls[1];
    // calls[1] as 'styled-normalize' calls createGlobalStyle first itself

    expect(createGlobalStyleArgs).toMatchSnapshot();
  });
});
