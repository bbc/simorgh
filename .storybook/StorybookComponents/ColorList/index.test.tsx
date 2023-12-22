import React from 'react';
import {
  render,
  screen,
} from '../../../src/app/components/react-testing-library-with-providers';
import ColorList from '.';
import { LEGACY } from '../../../docs/User-Experience/colours';

describe('Storybook Color List', () => {
  it('should render a unordered list when more than one Color is in the list', async () => {
    render(<ColorList Colors={LEGACY} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render a single color item when more only one Color is in the list', async () => {
    const { container } = render(
      <ColorList
        Colors={[{ colorName: 'TEST_COLOR', colorCode: '#123456' }]}
      />,
    );
    const list = screen.queryByRole('list');
    expect(container).toBeInTheDocument();
    expect(list).toBeNull();
  });

  it('should return  Null when the Color list is empty', async () => {
    const { container } = render(<ColorList Colors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
