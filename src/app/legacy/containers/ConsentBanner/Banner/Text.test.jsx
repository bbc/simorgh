import { screen } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import BannerText from './Text';

const bannerMessaging = {
  uk: {
    first: 'Just some text',
  },
  international: {
    first: 'Just some international text',
  },
};

const bannerWithLinkMessaging = {
  uk: {
    first: 'Some text ',
    linkText: 'with a link',
    linkUrl: 'https://www.bbc.co.uk',
    last: ' followed by text.',
  },
  international: {
    first: 'Some international text',
    linkText: 'with an international link',
    linkUrl: 'https://www.bbc.com',
    last: ' followed by international text.',
  },
};

const bannerTextWithContext = (message, topLevelDomain, isUK) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin={`https://www.test.bbc.${topLevelDomain}`}
      id="c0000000000o"
      isAmp={false}
      pageType={ARTICLE_PAGE}
      service="news"
      statusCode={200}
      pathname="/pathname"
      isUK={isUK}
    >
      <BannerText {...message} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('Consent Banner Text', () => {
  it('should correctly render banner text in the UK', () => {
    render(bannerTextWithContext(bannerMessaging, 'co.uk', true));
    expect(screen.getByText('Just some text')).toBeInTheDocument();
  });

  it('should correctly render banner text outside the UK', () => {
    render(bannerTextWithContext(bannerMessaging, 'com', false));
    expect(screen.getByText('Just some international text')).toBeInTheDocument();
  });

  it('should correctly render banner text with a link in the UK', () => {
    render(bannerTextWithContext(bannerWithLinkMessaging, 'co.uk', true));
    expect(screen.getByRole('link', { name: 'with a link' })).toHaveAttribute('href', 'https://www.bbc.co.uk');
  });

  it('should correctly render banner text with a link outside the UK', () => {
    render(bannerTextWithContext(bannerWithLinkMessaging, 'com'));
    expect(screen.getByRole('link', { name: 'with an international link' })).toHaveAttribute('href', 'https://www.bbc.com');
  });
});
