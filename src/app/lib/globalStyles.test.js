import * as styledComponents from 'styled-components';

describe('globalStyles', () => {
  it('should call createGlobalStyle with args matching snapshot', async () => {
    jest.spyOn(styledComponents, 'createGlobalStyle');

    await import('./globalStyles');

    const createGlobalStyleArgs =
      styledComponents.createGlobalStyle.mock.calls[0];

    expect(createGlobalStyleArgs).toMatchSnapshot();
  });
});
