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

  describe('RTL support', () => {
    it('should move to the previous tab on ArrowRight in RTL', () => {
      const onTabChange = jest.fn();

      render(
        <ScrollableTabs
          tabs={mockTabs}
          activeTabId="tab-2"
          onTabChange={onTabChange}
          labelledBy="heading-id"
        />,
        { service: 'arabic' },
      );

      fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });

      expect(onTabChange).toHaveBeenCalledWith('tab-1');
    });

    it('should move to the next tab on ArrowLeft in RTL', () => {
      const onTabChange = jest.fn();

      render(
        <ScrollableTabs
          tabs={mockTabs}
          activeTabId="tab-1"
          onTabChange={onTabChange}
          labelledBy="heading-id"
        />,
        { service: 'arabic' },
      );

      fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });

      expect(onTabChange).toHaveBeenCalledWith('tab-2');
    });
  });
});
