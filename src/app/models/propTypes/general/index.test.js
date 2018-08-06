import { arrayOfSpecificBlocks } from './index';

const propTypes = [
  { type: 'propOne', props: { propWouldBe: 'here' }, isRequired: false },
  { type: 'propTwo', props: { propWouldBe: 'here' }, isRequired: true },
];

const checkProps = props => arrayOfSpecificBlocks(propTypes)(props, 0);

describe('arrayOfSpecificBlocks', () => {
  it('should return an error if prop is not an array', () => {
    const propCheck = checkProps({ propThatIsntAnArray: {} });

    expect(propCheck).toEqual(Error('Invalid props: 0 is not an array.'));
  });

  it('should return an error if required props are missing', () => {});

  it('should check the type of each item in prop array', () => {});
});
