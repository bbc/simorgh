import React from 'react';
import { render } from '../react-testing-library-with-providers';
import transcriptFixture from './fixture.json';
import Transcript from './index';
import * as viewTracking from '../../hooks/useViewTracker';

describe('Transcript Component', () => {
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
    expect(summaryWithTitle).toHaveTextContent('Read transcript, My Title');
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

  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should register view tracking', () => {
      render(<Transcript transcript={transcriptFixture} title="My Title" />);

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'Transcript',
      });
    });
  });
});
