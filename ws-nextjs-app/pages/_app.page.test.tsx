import CustomApp from './_app.page';

describe('CustomApp', () => {
  it('does not define or inherit getInitialProps', () => {
    expect(CustomApp).not.toHaveProperty('getInitialProps');
  });
});
