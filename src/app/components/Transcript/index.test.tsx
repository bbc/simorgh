import React from 'react';
import { render } from '../react-testing-library-with-providers';
import transcriptFixture from './fixture.json';
import Transcript from './index';

describe('Transcript Component', () => {
  it('should match snapshot (temp)', () => {
    const { container } = render(
      <Transcript transcript={transcriptFixture} title="My Title" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render details element', () => {
    const { container } = render(
      <Transcript transcript={transcriptFixture} title="My Title" />,
    );
    const details = container.querySelector('details');
    expect(details).toBeInTheDocument();
  });

  it('should render summary element', () => {
    const { container } = render(<Transcript transcript={transcriptFixture} />);
    const summary = container.querySelector('summary');
    expect(summary).toBeInTheDocument();
  });

  it('should render the title as a visually hidden element inside the summary', () => {
    const { container } = render(
      <Transcript transcript={transcriptFixture} title="My Title" />,
    );
    const summaryWithTitle = container.querySelector('summary');
    expect(summaryWithTitle).toHaveTextContent('Read transcripts, My Title');
  });

  it('should render an unordered list element with role list', () => {
    const { container } = render(
      <Transcript transcript={transcriptFixture} title="My Title" />,
    );
    const unorderedList = container.querySelector('ul');
    expect(unorderedList).toBeInTheDocument();
    expect(unorderedList).toHaveRole('list');
  });

  it('should render multiple list elements', () => {
    const { container } = render(
      <Transcript transcript={transcriptFixture} title="My Title" />,
    );
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(34);
  });

  it('should not render if there are no transcript items', () => {
    const { container } = render(
      // @ts-expect-error unexpected value
      <Transcript transcript={[]} title="My Title" />,
    );
    const details = container.querySelector('details');
    expect(details).not.toBeInTheDocument();
  });
});
