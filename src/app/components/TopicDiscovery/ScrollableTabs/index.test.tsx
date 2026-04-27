import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import ScrollableTabs from '.';

const mockTabs = [
  { id: 'tab-1', label: 'Comportamento' },
  { id: 'tab-2', label: 'Mídia social' },
  { id: 'tab-3', label: 'Psicologia' },
];

describe('ScrollableTabs', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('should render all tabs', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
    );

    expect(
      screen.getByRole('tab', { name: 'Comportamento' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'Mídia social' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Psicologia' })).toBeInTheDocument();
  });

  it('should mark the active tab with aria-selected true', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-2"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
    );

    expect(screen.getByRole('tab', { name: 'Mídia social' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'Comportamento' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByRole('tab', { name: 'Psicologia' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('should call onTabChange when a tab is clicked', () => {
    const onTabChange = jest.fn();

    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={onTabChange}
        labelledBy="heading-id"
      />,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Mídia social' }));
    expect(onTabChange).toHaveBeenCalledWith('tab-2');
  });

  it('should call clickTrackerHandler onClick when a tab is clicked', () => {
    const mockClickHandler = jest.fn();

    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
        clickTrackerHandler={{ onClick: mockClickHandler }}
      />,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Mídia social' }));

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should render a tablist with the correct aria-labelledby', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="my-heading"
      />,
    );

    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-labelledby',
      'my-heading',
    );
  });

  it('should render scroll buttons', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
    );

    expect(screen.getByTestId('scroll-start')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-end')).toBeInTheDocument();
  });

  it('should scroll the tab container when the chevrons are clicked', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
    );

    let scrollLeft = 50;
    const tabListElement = screen.getByRole('tablist');
    const scrollBy = jest.fn(({ left }) => {
      scrollLeft += left;
    });

    Object.defineProperty(tabListElement, 'clientWidth', {
      configurable: true,
      get: () => 200,
    });
    Object.defineProperty(tabListElement, 'scrollWidth', {
      configurable: true,
      get: () => 500,
    });
    Object.defineProperty(tabListElement, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
    });
    Object.defineProperty(tabListElement, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });

    fireEvent(window, new Event('resize'));

    fireEvent.click(screen.getByTestId('scroll-end'));
    fireEvent.click(screen.getByTestId('scroll-start'));

    expect(scrollBy).toHaveBeenNthCalledWith(1, {
      left: 150,
      behavior: 'smooth',
    });
    expect(scrollBy).toHaveBeenNthCalledWith(2, {
      left: -150,
      behavior: 'smooth',
    });
  });
});
