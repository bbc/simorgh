import * as styledComponents from 'styled-components';

describe('globalStyles', () => {
  it('should call injectGlobal with args matching snapshot', async () => {
    jest.spyOn(styledComponents, 'injectGlobal');

    await import('./globalStyles');

    const injectGlobalArgs = styledComponents.injectGlobal.mock.calls[0]; // eslint-disable-line dot-notation

    expect(injectGlobalArgs).toMatchSnapshot();
  });
});
