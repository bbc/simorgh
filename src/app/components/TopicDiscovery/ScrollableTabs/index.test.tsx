import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { matchers } from '@emotion/jest';
import * as clickTrackerHook from '#app/hooks/useClickTrackerHandler';
import { GREY_2, GREY_5 } from '#app/components/ThemeProvider/palette';
import { GROUP_3_MIN_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import ScrollableTabs from '.';

expect.extend(matchers);

const mockTabs = [
  { id: 'tab-1', label: 'Comportamento' },
  { id: 'tab-2', label: 'Mídia social' },
  { id: 'tab-3', label: 'Psicologia' },
];

describe('ScrollableTabs', () => {
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
    jest
      .spyOn(clickTrackerHook, 'default')
      .mockReturnValue({ onClick: mockClickHandler });

    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
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

  it('should only render the divider from 600px and above', () => {
    const { container } = render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
    );

    const wrapper = container.firstChild;

    expect(wrapper).not.toHaveStyleRule('border-bottom');
    expect(wrapper).toHaveStyleRule(
      'border-bottom',
      `0.0625rem solid ${GREY_5}`,
      {
        media: GROUP_3_MIN_WIDTH.replace('@media ', ''),
      },
    );
  });

  it('should render scroll buttons in dark ui colours', () => {
    render(
      <ScrollableTabs
        tabs={mockTabs}
        activeTabId="tab-1"
        onTabChange={jest.fn()}
        labelledBy="heading-id"
      />,
      { pageType: MEDIA_ARTICLE_PAGE, service: 'portuguese' },
    );

    const scrollStartButton = screen.getByTestId('scroll-start');
    const scrollEndButton = screen.getByTestId('scroll-end');

    expect(scrollStartButton).toHaveStyle({ color: GREY_2 });
    expect(scrollEndButton).toHaveStyle({ color: GREY_2 });
    expect(scrollStartButton).toHaveStyleRule('fill', 'currentcolor', {
      target: 'svg',
    });
    expect(scrollEndButton).toHaveStyleRule('fill', 'currentcolor', {
      target: 'svg',
    });
  });
});
