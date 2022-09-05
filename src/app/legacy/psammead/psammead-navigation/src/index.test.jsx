import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
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
          script={latin}
          active={active}
          currentPageText="Current page"
          service="news"
          data-navigation="test_navigation"
          brandForegroundColour="#FDFDFD"
          brandHighlightColour="#FFFFFF"
          brandBorderColour="#EAB3B3"
        >
          {title}
        </NavigationLi>
      );
    })}
  </NavigationUl>
);

const NavigationExample = (
  <Navigation
    script={latin}
    service="news"
    brandBackgroundColour="#B80000"
    brandForegroundColour="#FDFDFD"
    brandBorderColour="#EAB3B3"
    brandHighlightColour="#FFFFFF"
  >
    {navigationUlComponent}
  </Navigation>
);

describe('Navigation', () => {
  shouldMatchSnapshot('should render correctly', NavigationExample);

  shouldMatchSnapshot(
    'should render correctly when isOpen is true',
    <Navigation
      script={latin}
      service="news"
      isOpen
      brandBackgroundColour="#B80000"
      brandForegroundColour="#FDFDFD"
      brandBorderColour="#EAB3B3"
      brandHighlightColour="#FFFFFF"
    >
      {navigationUlComponent}
    </Navigation>,
  );

  shouldMatchSnapshot(
    'should render correctly when ampOpenClass prop is provided',
    <Navigation
      script={latin}
      skipLinkText="Wụga n’ọdịnaya"
      service="news"
      ampOpenClass="is-open"
      brandBackgroundColour="#B80000"
      brandForegroundColour="#FDFDFD"
      brandBorderColour="#EAB3B3"
      brandHighlightColour="#FFFFFF"
    >
      {navigationUlComponent}
    </Navigation>,
  );
});

describe('Scrollable Navigation', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ScrollableNavigation
      brandBackgroundColour="#B80000"
      brandForegroundColour="#FDFDFD"
      brandBorderColour="#EAB3B3"
      brandHighlightColour="#FFFFFF"
    >
      {NavigationExample}
    </ScrollableNavigation>,
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
        brandForegroundColour="#FDFDFD"
        brandHighlightColour="#FFFFFF"
        brandBorderColour="#EAB3B3"
      >
        Testing exta props
      </NavigationLi>,
    );
    expect(
      container.querySelector('a').getAttribute('data-navigation'),
    ).toEqual('test_navigation');
  });
});
