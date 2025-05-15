/* eslint-disable no-console */
import React from 'react';
import addInlineScript from '.';

describe('addInlineScript', () => {
  it('should render the script as expected when script is a string', () => {
    const script = `console.log('hello world');`;

    const inlineScript = addInlineScript({ script });

    expect(inlineScript).toStrictEqual(
      <script type="text/javascript">{`console.log('hello world');`}</script>,
    );
  });

  it('should render the script as expected when script is a function', () => {
    const script = () => console.log('hello world');

    const inlineScript = addInlineScript({ script });

    expect(inlineScript).toStrictEqual(
      <script type="text/javascript">
        {`(function script() {
      return console.log('hello world');
    })()`}
      </script>,
    );
  });

  it.each([
    {
      title:
        'should render the script as expected when script is a function with empty string',
      params: '',
      expectedParamOutput: ``,
    },
    {
      title:
        'should render the script as expected when script is a function with a single string',
      params: 'helloWorld',
      expectedParamOutput: `"helloWorld"`,
    },
    {
      title:
        'should render the script as expected when script is a function with empty parameters',
      params: [],
      expectedParamOutput: ``,
    },
    {
      title:
        'should render the script as expected when script is a function with a single parameter',
      params: ['HelloWorld'],
      expectedParamOutput: `"HelloWorld"`,
    },
    {
      title:
        'should render the script as expected when script is a function with multiple parameter',
      params: ['Hello', 'There', 'World'],
      expectedParamOutput: `"Hello", "There", "World"`,
    },
  ])('$title', ({ params, expectedParamOutput }) => {
    const script = (printString: string) => console.log(printString);

    const inlineScript = addInlineScript({
      script,
      parameters: params,
    });

    expect(inlineScript).toStrictEqual(
      <script type="text/javascript">
        {`(function script(printString) {
      return console.log(printString);
    })(${expectedParamOutput})`}
      </script>,
    );
  });
});
