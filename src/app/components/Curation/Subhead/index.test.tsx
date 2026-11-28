import { MouseEvent } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '../../react-testing-library-with-providers';
import Subhead from '.';
import { Services } from '../../../models/types/global';

describe('Curation Subhead Component', () => {
  it('should render children directly within an h2 when there is no link', () => {
    render(<Subhead id="curation-heading">My Text</Subhead>, {
      service: 'mundo',
    });

    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: 'My Text',
    });
    expect(headingElement).toHaveAttribute('id', 'curation-heading');
    expect(headingElement.innerHTML).toBe('My Text');
  });

  it.each([
    ['mundo', 'chevron-forward.svg'],
    ['arabic', 'chevron-backward.svg'],
  ] as [Services, string][])(
    'should render a link with the correct chevron for %s',
    (service, asset) => {
      render(<Subhead link="https://bbc.com">My Text</Subhead>, { service });

      const headingElement = screen.getByRole('heading', {
        level: 2,
        name: 'My Text',
      });
      const anchorElement = screen.getByRole('link', { name: 'My Text' });
      expect(headingElement.firstElementChild).toBe(anchorElement);
      expect(anchorElement).toHaveAttribute('href', 'https://bbc.com');
      expect(anchorElement).toHaveClass('focusIndicatorDisplayBlock');
      expect(anchorElement.querySelector('span')).toHaveTextContent('My Text');

      const chevron = anchorElement.querySelector<HTMLElement>('.external-svg');
      expect(chevron).toHaveClass('chevron');
      expect(chevron?.style.getPropertyValue('--icon-source')).toContain(asset);
    },
  );

  it('should preserve link identity and focus while updating content and click tracking', () => {
    const originalClickTracker = jest.fn(
      (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault(),
    );
    const updatedClickTracker = jest.fn(
      (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault(),
    );
    const { rerender } = render(
      <Subhead link="https://bbc.com" onClick={originalClickTracker}>
        My Text
      </Subhead>,
      { service: 'mundo' },
    );

    const anchorElement = screen.getByRole('link', { name: 'My Text' });
    anchorElement.focus();

    rerender(
      <Subhead link="https://bbc.com/mundo" onClick={updatedClickTracker}>
        Updated Text
      </Subhead>,
    );

    expect(screen.getByRole('link', { name: 'Updated Text' })).toBe(
      anchorElement,
    );
    expect(anchorElement).toHaveFocus();
    expect(anchorElement).toHaveAttribute('href', 'https://bbc.com/mundo');

    fireEvent.click(anchorElement);
    expect(updatedClickTracker).toHaveBeenCalledTimes(1);
    expect(originalClickTracker).not.toHaveBeenCalled();
  });
});
