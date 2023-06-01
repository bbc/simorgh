import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ColorList from '.';
import ThemeProvider from '../../../src/app/components/ThemeProvider';
import { LEGACY } from '../../../docs/User-Experience/colours';

const ColorListFixture = () => (
  <ThemeProvider service="news" variant="default">
    <ColorList Colors={LEGACY} />
  </ThemeProvider>
);

describe('Color List', () => {
  it('should render a unordered list when more than one Color is in the list', async () => {
    await act(async () => {
      render(<ColorListFixture />);
    });

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });
});
