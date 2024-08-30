import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import useScreenGroup from '../hooks/useScreenGroup';
import Button from '.';

describe('Sign Post', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it(`should render a mini play button`, () => {
    const { container } = render(
      <Button
        className={''}
        datetime={''}
        duration={''}
        durationSpoken={''}
        title={''}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        guidanceMessage={''}
      />,
      {
        service: 'news',
      },
    );
    const text = container.querySelector('p')?.innerHTML;

    expect(text).toEqual(
      'Help reduce your power and data usage by not playing video content.',
    );
    expect(container).toMatchSnapshot();
  });
});
