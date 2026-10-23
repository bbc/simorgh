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
    ['mundo', 'M21.6 14.3L5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z'],
    ['arabic', 'M10.4 14.3L26.5 31h-6.4L5.5 16 20.1 1h6.4L10.4 17.7v-3.4z'],
  ] as [Services, string][])(
    'should render a link with the correct chevron for %s',
    (service, chevronPath) => {
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
      expect(anchorElement.querySelector('svg')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
      expect(anchorElement.querySelector('svg')).toHaveAttribute(
        'focusable',
        'false',
      );
      expect(anchorElement.querySelector('path')).toHaveAttribute(
        'd',
        chevronPath,
      );
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
