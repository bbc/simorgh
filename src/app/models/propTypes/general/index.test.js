import { arrayOfSpecificBlocks } from './index';
import * as requiredPropCheck from './requiredPropCheck';

const propData = {
  testProp: [
    { type: 'propOne', value: 'Some data' },
    { type: 'propTwo', value: 'Some More data' },
  ],
};

const propTypes = [
  { type: 'propOne', props: { propWouldBe: 'here' }, isRequired: false },
  { type: 'propTwo', props: { propWouldBe: 'here' }, isRequired: true },
];

const checkProps = props => arrayOfSpecificBlocks(propTypes)(props, 'testProp');

describe('arrayOfSpecificBlocks', () => {
  it('should return an error if prop is not an array', () => {
    const propCheck = checkProps({ testProp: {} });

    expect(propCheck).toEqual(
      Error('Invalid props: testProp is not an array.'),
    );
  });

  describe('missing required props', () => {
    beforeEach(() => {
      requiredPropCheck.default = jest
        .fn()
        .mockReturnValueOnce(['missingProp', 'missingPropTwo']);
    });

    it('should return an error', () => {
      const propCheck = checkProps(propData);

      expect(propCheck).toEqual(
        Error('Missing required props: missingProp,missingPropTwo'),
      );
    });
  });

  it('should check the type of each item in prop array', () => {});
});
