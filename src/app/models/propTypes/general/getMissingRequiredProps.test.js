import getMissingRequiredProps from './getMissingRequiredProps';

describe('getMissingRequiredProps', () => {
  const props = [
    { type: 'propOne' },
    { type: 'propTwo' },
    { type: 'propThree' },
  ];

  const types = [
    { type: 'propOne', isRequired: true },
    { type: 'propTwo', isRequired: true },
    { type: 'propThree', isRequired: false },
  ];

  const testGetMissingRequiredProps = (propTypes, expectedObject) => {
    const result = getMissingRequiredProps(propTypes, types);

    expect(result).toEqual(expectedObject);
  };

  describe('missing props', () => {
    it('should return an array of missing required props', () => {
      /* eslint-disable react/destructuring-assignment */
      const propsWithMissingRequiredProps = props.slice(2);

      testGetMissingRequiredProps(propsWithMissingRequiredProps, [
        'propOne',
        'propTwo',
      ]);
    });

    describe('missing non-required props', () => {
      it('should return an array void of missing non-required props', () => {
        /* eslint-disable react/destructuring-assignment */
        const propsWithNonRequiredProps = props.slice(0, 1);

        testGetMissingRequiredProps(propsWithNonRequiredProps, ['propTwo']);
      });
    });
  });

  describe('if no required props are missing', () => {
    it('should return an empty arrays', () => {
      testGetMissingRequiredProps(props, []);
    });
  });
});
