import renderer from 'react-test-renderer';

const shouldMatchSnapshot = (title, component) => {
  it(title, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
};

export default { shouldMatchSnapshot };
