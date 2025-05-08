/* eslint-disable no-console */
import React from 'react';
import { Helmet } from 'react-helmet';
import { render } from '#app/components/react-testing-library-with-providers';
import LiteButton from '.';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useId: jest.fn().mockReturnValue(':r0:'),
  };
});

describe('LiteButton', () => {
  it('should render a script tag with the passed in script string', () => {
    render(
      <LiteButton script="console.log(`Hello, world! I'm a string function`)">
        Click me
      </LiteButton>,
    );

    const helmet = Helmet.peek();
    expect(helmet.scriptTags).toHaveLength(1);

    const script = helmet.scriptTags[0].innerHTML;
    expect(script).toMatchSnapshot();
  });

  it('should render a script tag with the passed in script function', () => {
    render(
      <LiteButton
        script={() =>
          console.log(
            `Hello, world! I'm an arrow function transpiled to a traditional function`,
          )
        }
      >
        Click me
      </LiteButton>,
    );

    const helmet = Helmet.peek();
    expect(helmet.scriptTags).toHaveLength(1);

    const script = helmet.scriptTags[0].innerHTML;
    expect(script).toMatchSnapshot();
  });
});
