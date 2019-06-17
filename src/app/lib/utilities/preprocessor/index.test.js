import { loggerMock } from '../../../../testHelpers/index';
import preprocess from '.';

const fixtureData = { foo: 'bar' };

describe('Preprocessor', () => {
  it('should pass data unchanged if none of the business rules apply', () => {
    expect(preprocess(fixtureData)).toEqual(fixtureData);
    expect(loggerMock.error).not.toBeCalled();
  });

  it('should transform data according to the passed business rules', () => {
    const expectedOutput = {
      transformed: true,
    };
    const customTransformer = jest.fn(() => expectedOutput);
    expect(preprocess(fixtureData, [customTransformer])).toEqual(
      expectedOutput,
    );
    expect(customTransformer).toBeCalled();
    expect(loggerMock.error).not.toBeCalled();
  });

  it('should call the logger if unable to preprocess the JSON', () => {
    const transformerThatErrors = () => {
      throw new Error('something went wrong');
    };
    preprocess(fixtureData, [transformerThatErrors]);
    expect(loggerMock.error).toBeCalledWith(
      'JSON preprocessing failed: "Error: something went wrong"',
    );
  });
});
