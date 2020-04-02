import propTypesLib, { string } from 'prop-types';
import { arrayOfSpecificBlocks } from './index';

import * as getMissingRequiredProps from './getMissingRequiredProps';

const propData = {
  testProp: [
    { type: 'propOne', value: 'Some data' },
    { type: 'propTwo', value: 'Some More data' },
  ],
};

const propTypes = [
  { type: 'propOne', props: { propWouldBe: string }, isRequired: false },
  { type: 'propTwo', props: { propWouldBe: string }, isRequired: true },
];

const checkProps = (props) =>
  arrayOfSpecificBlocks(propTypes)(props, 'testProp', 'TestComponent');

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

    const call = (prop) => [
      { propWouldBe: string },
      prop,
      'prop',
      `${prop.type} - TestComponent`,
    ];
    const calls = propData.testProp.map(call);

    checkProps(propData);

    expect(propTypesLib.checkPropTypes.mock.calls).toEqual(calls);
  });
});
