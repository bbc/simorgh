import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import Image from '#psammead/psammead-image/src';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import Bulletin from '.';

/* eslint-disable react/prop-types */
const BulletinComponent = ({
  script,
  service,
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
    'https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

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
      script={script}
      service={service}
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
  shouldMatchSnapshot(
    'should render audio correctly',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="audio"
      ctaText="Listen"
      ariaId="https://bbc.co.uk"
    />,
  );

  shouldMatchSnapshot(
    'should render audio correctly with lang prop passed in',
    <BulletinComponent
      script={arabic}
      service="arabic"
      mediaType="audio"
      ctaText="Listen"
      dir="rtl"
      lang="en-GB"
      ariaId="https://bbc.co.uk"
    />,
  );

  shouldMatchSnapshot(
    'should render video correctly',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="video"
      ctaText="Watch"
      ariaId="https://bbc.co.uk"
    />,
  );

  shouldMatchSnapshot(
    'should render live audio correctly',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="audio"
      ctaText="Listen"
      ariaId="https://bbc.co.uk"
      isLive
    />,
  );

  shouldMatchSnapshot(
    'should render live video correctly',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="video"
      ctaText="Watch"
      ariaId="https://bbc.co.uk"
      isLive
    />,
  );

  shouldMatchSnapshot(
    'should render radio bulletin without summary correctly',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="audio"
      ctaText="Listen"
      ariaId="https://bbc.co.uk"
      withSummary={false}
    />,
  );

  // the below test is a temporary test for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  shouldMatchSnapshot(
    'should render radio bulletin without ariaId',
    <BulletinComponent
      script={latin}
      service="news"
      mediaType="audio"
      ctaText="Listen"
    />,
  );
});
