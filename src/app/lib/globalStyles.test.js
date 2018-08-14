import * as styledComponents from 'styled-components';

describe('injectGlobal', () => {
  it('should be called with args matching snapshot', async () => {
    jest.spyOn(styledComponents, 'injectGlobal');

    await import('./globalStyles');

    const injectGlobalArgs = styledComponents.injectGlobal.mock.calls[0];

    expect(injectGlobalArgs).toMatchSnapshot();
  });
});
