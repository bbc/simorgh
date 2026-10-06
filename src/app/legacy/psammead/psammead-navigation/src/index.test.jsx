import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ScrollableNavigation } from './ScrollableNavigation';
import Navigation, { NavigationUl, NavigationLi } from './index';
import igboNavData from '../testHelpers/igbo';

const navigationUlComponent = (
  <NavigationUl>
    {igboNavData.map((item, index) => {
      const { title, url } = item;
      const active = index === 0;

      return (
        <NavigationLi
          key={title}
          url={url}
          active={active}
          currentPageText="Current page"
          service="news"
          data-navigation="test_navigation"
        >
          {title}
        </NavigationLi>
      );
    })}
  </NavigationUl>
);

const NavigationExample = <Navigation>{navigationUlComponent}</Navigation>;

describe('Navigation', () => {
  it('should render correctly', () => {
    render(NavigationExample);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render correctly when isOpen is true', () => {
    render(<Navigation isOpen>{navigationUlComponent}</Navigation>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render correctly when ampOpenClass prop is provided', () => {
    render(
      <Navigation
        skipLinkText="Wụga n’ọdịnaya"
        service="news"
        ampOpenClass="is-open"
      >
        {navigationUlComponent}
      </Navigation>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('Scrollable Navigation', () => {
  it('should render correctly', () => {
    render(<ScrollableNavigation>{NavigationExample}</ScrollableNavigation>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('Assertions', () => {
  it('should add extra props passed to the NavigationLi link', () => {
    const { container } = render(
      <NavigationLi
        key="test-key"
        url="http://test.url"
        currentPageText="Current page"
        service="news"
        active
        data-navigation="test_navigation"
      >
        Testing extra props
      </NavigationLi>,
    );
    expect(
      container.querySelector('a').getAttribute('data-navigation'),
    ).toEqual('test_navigation');
  });
});
