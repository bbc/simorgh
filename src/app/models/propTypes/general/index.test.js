import propTypesLib from 'prop-types';
import { arrayOfSpecificBlocks } from './index';

import * as getMissingRequiredProps from './getMissingRequiredProps';

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

  it('should return an error if missing required props', () => {
    getMissingRequiredProps.default = jest
      .fn()
      .mockReturnValue([])
      .mockReturnValueOnce(['missingProp', 'missingPropTwo']);

    const propCheck = checkProps(propData);

    expect(propCheck).toEqual(
      Error('Missing required props: missingProp,missingPropTwo'),
    );
  });

  it('should check the type of each item in prop array', () => {
    jest.spyOn(propTypesLib, 'checkPropTypes');

    const call = prop => [{ propWouldBe: 'here' }, prop, 'prop', prop.type];
    const calls = propData.testProp.map(call);

    checkProps(propData);

    expect(propTypesLib.checkPropTypes.mock.calls).toEqual(calls);
  });
});
