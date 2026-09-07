import { screen } from '@testing-library/react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import Image from '#psammead/psammead-image/src';
import { render } from '../../../../components/react-testing-library-with-providers';
import Bulletin from '.';

const BulletinComponent = ({
  isLive,
  mediaType,
  ctaText,
  withSummary = true,
  dir = 'ltr',
  lang = null,
  ariaId,
}) => {
  const summaryText = 'This is the summary text';
  const headlineText = 'This is the headline';
  const ctaLink = 'https://bbc.co.uk';
  const imageSizes = [300, 450, 600, 1024];
  const imageSrc =
    'https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

  const playCtaText = isLive ? `${ctaText} Live` : ctaText;
  const offScreenText = isLive ? `${ctaText} LIVE` : ctaText;

  const image = (
    <Image
      src={imageSrc}
      alt="Iron man"
      srcset={imageSizes
        .map(size => `${imageSrc.replace('[WIDTH]', size)}.webp ${size}w`)
        .join(', ')}
      fallbackSrcset={imageSizes
        .map(size => `${imageSrc.replace('[WIDTH]', size)} ${size}w`)
        .join(', ')}
      primaryMimeType="image/webp"
      fallbackMimeType="image/jpeg"
    />
  );
  return (
    <Bulletin
      image={image}
      mediaType={mediaType}
      headlineText={headlineText}
      summaryText={withSummary ? summaryText : null}
      ctaLink={ctaLink}
      ctaText={playCtaText}
      isLive={isLive}
      offScreenText={offScreenText}
      dir={dir}
      lang={lang}
      ariaId={ariaId}
    />
  );
};

describe('Bulletin', () => {
  suppressPropWarnings(['ariaId', 'undefined']);

  it('should render audio correctly', () => {
    render(
      <BulletinComponent
        mediaType="audio"
        ctaText="Listen"
        ariaId="https://bbc.co.uk"
      />,
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  it('should render audio correctly with lang prop passed in', () => {
    render(
      <BulletinComponent
        mediaType="audio"
        ctaText="Listen"
        dir="rtl"
        lang="en-GB"
        ariaId="https://bbc.co.uk"
      />,
      { service: 'arabic' },
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  it('should render video correctly', () => {
    render(
      <BulletinComponent
        mediaType="video"
        ctaText="Watch"
        ariaId="https://bbc.co.uk"
      />,
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  it('should render live audio correctly', () => {
    render(
      <BulletinComponent
        mediaType="audio"
        ctaText="Listen"
        ariaId="https://bbc.co.uk"
        isLive
      />,
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  it('should render live video correctly', () => {
    render(
      <BulletinComponent
        mediaType="video"
        ctaText="Watch"
        ariaId="https://bbc.co.uk"
        isLive
      />,
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  it('should render radio bulletin without summary correctly', () => {
    render(
      <BulletinComponent
        mediaType="audio"
        ctaText="Listen"
        ariaId="https://bbc.co.uk"
        withSummary={false}
      />,
    );
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });

  // the below test is a temporary test for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  it('should render radio bulletin without ariaId', () => {
    render(<BulletinComponent mediaType="audio" ctaText="Listen" />);
    expect(screen.getByText('This is the headline')).toBeInTheDocument();
  });
});
