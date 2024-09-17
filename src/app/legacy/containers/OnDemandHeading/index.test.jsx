import React from 'react';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import {
  render,
  getByText,
  getByRole,
} from '#components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import OnDemandHeadingContainer from '.';

const releaseDateTimeStamp = 1587945600000;

const Component = ({ ariaHidden, idAttr, episodeTitle }) => (
  <ServiceContextProvider service="news">
    <OnDemandHeadingContainer
      brandTitle="Dunia Pagi Ini"
      releaseDateTimeStamp={releaseDateTimeStamp}
      uuid="uuid"
      idAttr={idAttr}
      ariaHidden={ariaHidden}
      episodeTitle={episodeTitle}
    />
  </ServiceContextProvider>
);

describe('AudioPlayer blocks OnDemandHeading', () => {
  it('should render correctly', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly - dark mode', () => {
    const { container } = render(<Component />, {
      pageType: 'media',
      derivedPageType: 'On Demand TV',
      service: 'afrique',
    });
    expect(container).toMatchSnapshot();
  });

  it('should have semantic h1 with child span with role attribute = text so that screen readers read the BrandTitle and Datestamp in one go', () => {
    render(<Component />);

    const outerH1 = document.querySelector('h1');
    const spanWithAriaRoleText = getByRole(outerH1, 'text');
    const brandTitle = getByText(spanWithAriaRoleText, 'Dunia Pagi Ini');

    expect(outerH1).toContainElement(spanWithAriaRoleText);
    expect(spanWithAriaRoleText).toContainElement(brandTitle);
  });

  it('should not emit an h1 when ariaHidden is true', () => {
    render(<Component ariaHidden />);

    expect(document.querySelector('h1')).toBeNull();
  });

  it('should be aria-hidden when ariaHidden is true', () => {
    const { container } = render(<Component ariaHidden />);

    expect(container.querySelector('strong[aria-hidden=true]')).toBeDefined();
  });

  it('should have a tab index of -1 when id is "content"', () => {
    const { container } = render(<Component idAttr="content" />);

    expect(container.querySelector('[tabIndex=-1]')).toBeInTheDocument();
  });

  it('should not have a tab index when id is not "content"', () => {
    const { container } = render(<Component idAttr="foo" />);

    expect(container.querySelector('[tabIndex]')).toBeNull();
  });

  it('should have visually hidden comma so screenreaders pause when reading', () => {
    render(<Component />);

    const visuallyHiddenComma = document.querySelector(
      'span[class*="visuallyHiddenText"]',
    );

    expect(visuallyHiddenComma).toBeInTheDocument();
    expect(visuallyHiddenComma).toContainHTML(', ');
  });

  it('should show the episode title instead of timestamp when given', () => {
    const { getByText: getElementByText, queryByText } = render(
      <Component episodeTitle="Another one" />,
    );

    const timestamp = formatUnixTimestamp({
      timestamp: releaseDateTimeStamp,
      format: 'LL',
      timezone: 'Europe/London',
      locale: 'en-gb',
      isRelative: false,
    });
    const episodeTitle = getElementByText('Another one');
    const releaseDate = queryByText(timestamp);
    expect(episodeTitle).toBeInTheDocument();
    expect(releaseDate).toBeNull();
  });
});
