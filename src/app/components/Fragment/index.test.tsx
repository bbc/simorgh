import React from 'react';
import Fragment from '.';
import { render } from '../react-testing-library-with-providers';

describe('Fragment', () => {
  it('with no attributes', () => {
    const { getByText } = render(<Fragment text="HELLOWORLD" />);

    expect(getByText('HELLOWORLD').textContent).toEqual('HELLOWORLD');
  });

  it('with bold attributes', () => {
    const { container } = render(
      <Fragment text="BOLD TEXT" attributes={['bold']} />,
    );

    expect(container.querySelector('b')?.textContent).toEqual('BOLD TEXT');
  });

  it('with italic attributes', () => {
    const { container } = render(
      <Fragment text="ITALIC TEXT" attributes={['italic']} />,
    );

    expect(container.querySelector('i')?.textContent).toEqual('ITALIC TEXT');
  });

  it('with unknown attributes', () => {
    const { container } = render(
      <Fragment
        text="BOLD WITH UNKNOWN TEXT"
        attributes={['bold', 'unknown']}
      />,
    );

    expect(container.querySelector('b')?.textContent).toEqual(
      'BOLD WITH UNKNOWN TEXT',
    );
  });

  it('with italic attributes in Farsi', () => {
    const { container } = render(
      <Fragment
        text="ITALIC WITH PERSIAN TEXT"
        attributes={['italic', 'unknown']}
      />,
      { service: 'persian' },
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('i')?.textContent).toEqual(
      'ITALIC WITH PERSIAN TEXT',
    );
  });

  it('should emit a null when provided with no content', () => {
    const { container } = render(<Fragment text="" />);

    expect(container.querySelector('div')).toBe(null);
  });
});
