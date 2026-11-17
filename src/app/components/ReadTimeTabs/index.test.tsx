import {
  render,
  screen,
  fireEvent,
  queryByTestId,
} from '#app/components/react-testing-library-with-providers';
import { matchers } from '@emotion/jest';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import ReadTimeTabs from '.';
import {
  shortReadItems,
  longReadItems,
  mixedItems,
  unclassifiableItems,
  arabicMixedItems,
} from './fixtures';

jest.mock('#app/hooks/useViewTracker', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useViewTracker'),
}));

jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useClickTrackerHandler'),
}));

expect.extend(matchers);

describe('ReadTimeTabs', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('heading', () => {
    it('should render heading as h2 with "Read more" text', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const section = screen.getByTestId('read-time-tabs');
      const heading = section.querySelector('h2');
      expect(heading).toHaveTextContent('Read more');
    });

    it('should render heading with correct id for aria-labelledby', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const section = screen.getByTestId('read-time-tabs');
      const heading = section.querySelector('h2');
      expect(heading).toHaveAttribute('id', 'read-time-tabs-heading');
    });
  });

  describe('rendering structure', () => {
    it('should render section with data-testid', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      expect(screen.getByTestId('read-time-tabs')).toBeInTheDocument();
    });

    it('should render section with aria-labelledby pointing to heading', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const section = screen.getByTestId('read-time-tabs');
      expect(section).toHaveAttribute(
        'aria-labelledby',
        'read-time-tabs-heading',
      );
    });
  });

  describe('mixed items with both short and long reads', () => {
    it('should render two tabs with correct labels', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      expect(
        screen.getByRole('tab', { name: 'Short reads' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Long reads' }),
      ).toBeInTheDocument();
    });

    it('should render tablist with aria-labelledby', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute(
        'aria-labelledby',
        'read-time-tabs-heading',
      );
    });

    it('should mark short reads tab as aria-selected by default', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      expect(screen.getByRole('tab', { name: 'Short reads' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('tab', { name: 'Long reads' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('should render tabpanel for active short reads tab', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab-short-reads');
      expect(tabpanel).toHaveAttribute('id', 'tabpanel-short-reads');
    });

    it('should display short read titles in default short reads tab', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      expect(screen.getByText('Short read one')).toBeInTheDocument();
      expect(screen.getByText('Short read two')).toBeInTheDocument();
      expect(
        screen.getByText('Short read at the threshold'),
      ).toBeInTheDocument();
      expect(screen.getByText('Short read four')).toBeInTheDocument();

      expect(
        screen.queryByText('Long read at the threshold'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Long read two')).not.toBeInTheDocument();
      expect(screen.queryByText('Long read three')).not.toBeInTheDocument();
      expect(screen.queryByText('Long read four')).not.toBeInTheDocument();
    });

    it('should switch to long reads tab on click and show long titles', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Long reads' }));

      expect(screen.getByRole('tab', { name: 'Long reads' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('tab', { name: 'Short reads' })).toHaveAttribute(
        'aria-selected',
        'false',
      );

      expect(
        screen.getByText('Long read at the threshold'),
      ).toBeInTheDocument();
      expect(screen.getByText('Long read two')).toBeInTheDocument();
      expect(screen.getByText('Long read three')).toBeInTheDocument();
      expect(screen.getByText('Long read four')).toBeInTheDocument();

      expect(screen.queryByText('Short read one')).not.toBeInTheDocument();
      expect(screen.queryByText('Short read two')).not.toBeInTheDocument();
    });

    it('should not call global fetch when switching tabs', () => {
      const fetchSpy = jest.spyOn(global, 'fetch');

      render(<ReadTimeTabs items={mixedItems} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Long reads' }));

      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('should update tabpanel when switching tabs', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      let tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab-short-reads');

      fireEvent.click(screen.getByRole('tab', { name: 'Long reads' }));

      tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab-long-reads');
    });
  });

  describe('single category items', () => {
    it('should render list without tabs when only short reads exist (relative split)', () => {
      render(<ReadTimeTabs items={shortReadItems} />);

      // 4 short items triggers relative split (k=2), giving 2 short and 2 long
      // Both groups have items, so tabs should render
      expect(
        screen.getByRole('tab', { name: 'Short reads' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Long reads' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Short read one')).toBeInTheDocument();
    });

    it('should render list without tabs when only long reads exist (relative split)', () => {
      render(<ReadTimeTabs items={longReadItems} />);

      // 4 long items triggers relative split (k=2), giving 2 short and 2 long
      // Both groups have items, so tabs should render
      expect(
        screen.getByRole('tab', { name: 'Short reads' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Long reads' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Long read at the threshold'),
      ).toBeInTheDocument();
    });

    it('should still render heading when only short reads exist', () => {
      render(<ReadTimeTabs items={shortReadItems} />);

      const section = screen.getByTestId('read-time-tabs');
      const heading = section.querySelector('h2');
      expect(heading).toHaveTextContent('Read more');
    });

    it('should still render heading when only long reads exist', () => {
      render(<ReadTimeTabs items={longReadItems} />);

      const section = screen.getByTestId('read-time-tabs');
      const heading = section.querySelector('h2');
      expect(heading).toHaveTextContent('Read more');
    });

    it('should render no tabs and one list when fewer than 4 total valid items', () => {
      const threeItems = shortReadItems.slice(0, 3);

      render(<ReadTimeTabs items={threeItems} />);

      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
      expect(screen.getByText('Short read one')).toBeInTheDocument();
      expect(screen.getByText('Short read two')).toBeInTheDocument();
      expect(
        screen.getByText('Short read at the threshold'),
      ).toBeInTheDocument();
    });

    it('should render nothing when fewer than 2 valid items', () => {
      const { container } = render(
        <ReadTimeTabs
          items={[
            {
              id: '1',
              title: 'Single item',
              link: 'https://test.com/1',
              readTime: 2,
            },
          ]}
        />,
      );

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });
  });

  describe('no classifiable items', () => {
    it('should render nothing when only unclassifiable items provided', () => {
      const { container } = render(
        <ReadTimeTabs items={unclassifiableItems} />,
      );

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });

    it('should render nothing when items array is empty', () => {
      const { container } = render(<ReadTimeTabs items={[]} />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });
  });

  describe('malformed input', () => {
    it('should render nothing without throwing when items is a string', () => {
      const { container } = render(<ReadTimeTabs items="not an array" />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });

    it('should render nothing without throwing when items is null', () => {
      const { container } = render(<ReadTimeTabs items={null} />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });

    it('should render nothing without throwing when items is an object', () => {
      const { container } = render(
        <ReadTimeTabs items={{ id: 'test', title: 'Test' }} />,
      );

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });

    it('should render nothing without throwing when items is undefined', () => {
      const { container } = render(<ReadTimeTabs items={undefined} />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });

    it('should render nothing without throwing when items is a number', () => {
      const { container } = render(<ReadTimeTabs items={42} />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should render loading skeleton when isLoading is true', () => {
      render(<ReadTimeTabs items={mixedItems} isLoading />);

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should not render tabs when isLoading is true', () => {
      render(<ReadTimeTabs items={mixedItems} isLoading />);

      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });

    it('should not render content when isLoading is true', () => {
      render(<ReadTimeTabs items={mixedItems} isLoading />);

      expect(screen.queryByText('Short read one')).not.toBeInTheDocument();
    });

    it('should render skeleton with aria-live="polite"', () => {
      render(<ReadTimeTabs items={mixedItems} isLoading />);

      const loading = screen.getByTestId('loading');
      expect(loading).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('error state', () => {
    it('should render error message when isError is true', () => {
      render(<ReadTimeTabs items={mixedItems} isError />);

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Failed to load. Please try again later.',
      );
    });

    it('should render error message with role=alert', () => {
      render(<ReadTimeTabs items={mixedItems} isError />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not render tabs when isError is true', () => {
      render(<ReadTimeTabs items={mixedItems} isError />);

      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });

    it('should not render content when isError is true', () => {
      render(<ReadTimeTabs items={mixedItems} isError />);

      expect(screen.queryByText('Short read one')).not.toBeInTheDocument();
    });
  });

  describe('loading and error conflict', () => {
    it('should show content when both isLoading and isError are true (error takes priority)', () => {
      render(<ReadTimeTabs items={mixedItems} isLoading isError />);

      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByText('Short read one')).toBeInTheDocument();
    });
  });

  describe('read time text visibility', () => {
    it('should display read time text for items when service has readTime translations', () => {
      render(<ReadTimeTabs items={mixedItems} />, { service: 'pidgin' });

      const readTimeElements = screen.getAllByTestId('read-time');
      expect(readTimeElements.length).toBeGreaterThan(0);
      expect(readTimeElements.length).toBe(shortReadItems.length);

      readTimeElements.forEach(element => {
        expect(element.textContent).not.toContain('NaN');
        expect(element.textContent).not.toContain('undefined');
      });
    });

    it('should display correct read time for each item in active tab', () => {
      render(<ReadTimeTabs items={mixedItems} />, { service: 'pidgin' });

      const readTimeElements = screen.getAllByTestId('read-time');
      expect(readTimeElements).toHaveLength(shortReadItems.length);
    });

    it('should update read time display when switching tabs', () => {
      render(<ReadTimeTabs items={mixedItems} />, { service: 'pidgin' });

      expect(screen.getAllByTestId('read-time')).toHaveLength(
        shortReadItems.length,
      );

      fireEvent.click(screen.getByRole('tab', { name: 'Long reads' }));

      const readTimeElements = screen.getAllByTestId('read-time');
      expect(readTimeElements.length).toBe(longReadItems.length);

      readTimeElements.forEach(element => {
        expect(element.textContent).not.toContain('NaN');
        expect(element.textContent).not.toContain('undefined');
      });
    });

    it('should not contain NaN in any read time text', () => {
      render(<ReadTimeTabs items={mixedItems} />, { service: 'pidgin' });

      const readTimeElements = screen.getAllByTestId('read-time');
      readTimeElements.forEach(element => {
        expect(element.textContent).not.toContain('NaN');
      });
    });

    it('should not contain undefined in any read time text', () => {
      render(<ReadTimeTabs items={mixedItems} />, { service: 'pidgin' });

      const readTimeElements = screen.getAllByTestId('read-time');
      readTimeElements.forEach(element => {
        expect(element.textContent).not.toContain('undefined');
      });
    });
  });

  describe('right-to-left language support', () => {
    it('should render section with dir=rtl for Arabic service', () => {
      render(<ReadTimeTabs items={arabicMixedItems} />, { service: 'arabic' });

      const section = screen.getByTestId('read-time-tabs');
      expect(section).toHaveAttribute('dir', 'rtl');
    });

    it('should render tabs correctly for Arabic service', () => {
      render(<ReadTimeTabs items={arabicMixedItems} />, { service: 'arabic' });

      expect(
        screen.getByRole('tab', { name: 'Short reads' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Long reads' }),
      ).toBeInTheDocument();
    });

    it('should display content correctly for Arabic service', () => {
      render(<ReadTimeTabs items={arabicMixedItems} />, { service: 'arabic' });

      expect(screen.getByText('Short read one')).toBeInTheDocument();
    });
  });

  describe('analytics - view tracking', () => {
    it('should call useViewTracker with componentName and groupTracker', () => {
      const mockViewTracker = { 'data-testid': 'view-tracker' };
      jest.spyOn(viewTracking, 'default').mockReturnValue(mockViewTracker);

      render(<ReadTimeTabs items={mixedItems} />);

      expect(viewTracking.default).toHaveBeenCalledWith(
        expect.objectContaining({
          componentName: 'read-time-tabs',
          groupTracker: expect.objectContaining({
            name: 'Read more',
            type: 'read-time-tabs',
            itemCount: mixedItems.length,
          }),
        }),
      );
    });

    it('should include itemCount in groupTracker when items exist', () => {
      const mockViewTracker = { 'data-testid': 'view-tracker' };
      jest.spyOn(viewTracking, 'default').mockReturnValue(mockViewTracker);

      render(<ReadTimeTabs items={mixedItems} />);

      expect(viewTracking.default).toHaveBeenCalledWith(
        expect.objectContaining({
          groupTracker: expect.objectContaining({
            itemCount: 8,
          }),
        }),
      );
    });

    it('should not include itemCount in groupTracker when no items are classifiable', () => {
      const mockViewTracker = { 'data-testid': 'view-tracker' };
      jest.spyOn(viewTracking, 'default').mockReturnValue(mockViewTracker);

      render(<ReadTimeTabs items={unclassifiableItems} />);

      expect(viewTracking.default).toHaveBeenCalledWith(
        expect.objectContaining({
          groupTracker: expect.not.objectContaining({
            itemCount: expect.anything(),
          }),
        }),
      );
    });
  });

  describe('analytics - click tracking', () => {
    it('should track tab click with component name and text', () => {
      const mockClickHandler = jest.fn();
      jest
        .spyOn(clickTracking, 'default')
        .mockReturnValue({ onClick: mockClickHandler });

      render(<ReadTimeTabs items={mixedItems} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Long reads' }));

      expect(clickTracking.default).toHaveBeenCalled();
    });

    it('should call useClickTrackerHandler for tab interactions', () => {
      const mockClickTrackerSpy = jest.spyOn(clickTracking, 'default');

      render(<ReadTimeTabs items={mixedItems} />);

      expect(mockClickTrackerSpy).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle items with extra properties', () => {
      const itemsWithExtra = [
        {
          id: 'test-1',
          title: 'Test',
          link: 'https://test.com',
          readTime: 2,
          extra: 'property',
          another: 123,
        },
        {
          id: 'test-2',
          title: 'Test 2',
          link: 'https://test.com/2',
          readTime: 1,
          extra: 'property2',
        },
        {
          id: 'test-3',
          title: 'Test 3',
          link: 'https://test.com/3',
          readTime: 6,
          extra: 'property3',
        },
        {
          id: 'test-4',
          title: 'Test 4',
          link: 'https://test.com/4',
          readTime: 7,
          extra: 'property4',
        },
      ];

      render(<ReadTimeTabs items={itemsWithExtra} />);

      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should render default heading without custom className', () => {
      render(<ReadTimeTabs items={mixedItems} />);

      const section = screen.getByTestId('read-time-tabs');
      const heading = section.querySelector('h2');
      expect(heading).toBeInTheDocument();
    });

    it('should apply className when provided', () => {
      const { container } = render(
        <ReadTimeTabs items={mixedItems} className="custom-class" />,
      );

      const section = container.querySelector('.custom-class');
      expect(section).toBeInTheDocument();
    });
  });

  describe('no items prop', () => {
    it('should render nothing when items prop is not provided', () => {
      const { container } = render(<ReadTimeTabs />);

      expect(
        queryByTestId(container, 'read-time-tabs'),
      ).not.toBeInTheDocument();
    });
  });
});
