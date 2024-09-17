import React from 'react';
import {
  render,
  screen,
} from '#components/react-testing-library-with-providers';
import EmbedHtml from '.';

describe('EmbedHtml', () => {
  it('should render passed in escaped html', async () => {
    render(<EmbedHtml embeddableContent="<h1>Barbenheimer</h1>" />);

    const renderedHtmlHeader = screen.queryByRole('heading');
    expect(renderedHtmlHeader).toBeInTheDocument();
  });
  it('should not render when empty string passed into embedHtml', async () => {
    const { container } = render(<EmbedHtml embeddableContent="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
