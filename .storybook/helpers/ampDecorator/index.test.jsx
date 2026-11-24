import AmpDecorator from './index';

describe('AmpDecorator', () => {
  it('should render correctly', () => {
    const component = AmpDecorator(() => <div>Foobar</div>);
    expect(component).toMatchSnapshot();
  });
});
