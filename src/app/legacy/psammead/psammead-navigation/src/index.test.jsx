import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import { ScrollableNavigation } from './ScrollableNavigation';
import Navigation, { NavigationUl, NavigationLi } from './index';
import igboNavData from '../testHelpers/igbo';
import ThemeProvider from '../../../../components/ThemeProvider';

const navigationUlComponent = (
  <NavigationUl>
    {igboNavData.map((item, index) => {
      const { title, url } = item;
      const active = index === 0;

      return (
        <NavigationLi
          key={title}
          url={url}
          script={latin}
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

const NavigationExample = (
  <ThemeProvider service="news">
    <Navigation script={latin} service="news">
      {navigationUlComponent}
    </Navigation>
  </ThemeProvider>
);

describe('Navigation', () => {
  shouldMatchSnapshot('should render correctly', NavigationExample);

  shouldMatchSnapshot(
    'should render correctly when isOpen is true',
    <ThemeProvider service="news">
      <Navigation script={latin} service="news" isOpen>
        {navigationUlComponent}
      </Navigation>
    </ThemeProvider>,
  );

  shouldMatchSnapshot(
    'should render correctly when ampOpenClass prop is provided',
    <ThemeProvider service="news">
      <Navigation
        script={latin}
        skipLinkText="Wụga n’ọdịnaya"
        service="news"
        ampOpenClass="is-open"
      >
        {navigationUlComponent}
      </Navigation>
    </ThemeProvider>,
  );
});

describe('Scrollable Navigation', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ThemeProvider service="news">
      <ScrollableNavigation>{NavigationExample}</ScrollableNavigation>
    </ThemeProvider>,
  );
});

describe('Assertions', () => {
  it('should add extra props passed to the NavigationLi link', () => {
    const { container } = render(
      <NavigationLi
        key="test-key"
        url="http://test.url"
        script={latin}
        currentPageText="Current page"
        service="news"
        active
        data-navigation="test_navigation"
      >
        Testing exta props
      </NavigationLi>,
    );
    expect(
      container.querySelector('a').getAttribute('data-navigation'),
    ).toEqual('test_navigation');
  });
});
