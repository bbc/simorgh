import requiredPropCheck from './requiredPropCheck';

describe('requiredPropCheck', () => {
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

  const testRequiredPropCheck = (propTypes, expectedObject) => {
    const result = requiredPropCheck(propTypes, types);

    expect(result).toEqual(expectedObject);
  };

  describe('missing props', () => {
    it('should return an array of missing required props', () => {
      /* eslint-disable react/destructuring-assignment */
      const propsWithMissingRequiredProps = props.slice(2);

      testRequiredPropCheck(propsWithMissingRequiredProps, [
        'propOne',
        'propTwo',
      ]);
    });

    describe('missing non-required props', () => {
      it('should return an array void of missing non-required props', () => {
        /* eslint-disable react/destructuring-assignment */
        const propsWithNonRequiredProps = props.slice(0, 1);

        testRequiredPropCheck(propsWithNonRequiredProps, ['propTwo']);
      });
    });
  });

  describe('if no required props are missing', () => {
    it('should return an empty arrays', () => {
      testRequiredPropCheck(props, []);
    });
  });
});
