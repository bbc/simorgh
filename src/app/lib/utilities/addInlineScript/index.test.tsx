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

  it('should render the script as expected when script is a function with parameter', () => {
    const script = (printString: string) => console.log(printString);

    const inlineScript = addInlineScript({ script, parameters: 'HelloWorld' });

    expect(inlineScript).toStrictEqual(
      <script type="text/javascript">
        {`(function script(printString) {
      return console.log(printString);
    })('HelloWorld')`}
      </script>,
    );
  });
});
