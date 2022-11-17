import React from 'react';
import { render, screen, act } from '@testing-library/react';
import DocsDecorator from '.';
import ThemeProvider from '../../src/app/components/ThemeProvider';

const DocsDecoratorFixture = ({
  context,
  children,
}: {
  context: any;
  children: any;
}) => (
  <ThemeProvider service="news" variant="default">
    <DocsDecorator context={context} children={children} />
  </ThemeProvider>
);

describe('Storybook DocsDecorator', () => {
  it('should render documentation title', async () => {
    await act(async () => {
      render(<DocsDecoratorFixture context={} children={} />);
    });

    const title = screen.getByText('This is the documentation title');
    expect(title).toBeInTheDocument();
  });
});
