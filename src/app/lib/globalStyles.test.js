import * as styledComponents from 'styled-components';

describe('globalStyles', () => {
  it('should call injectGlobal with args matching snapshot', async () => {
    jest.spyOn(styledComponents, 'injectGlobal');

    console.log('globalStyles');

    await import('./globalStyles');

    console.log('after await globalStyles');

    const injectGlobalArgs = styledComponents.injectGlobal.mock.calls[0];

    expect(injectGlobalArgs).toMatchSnapshot();
  });
});
