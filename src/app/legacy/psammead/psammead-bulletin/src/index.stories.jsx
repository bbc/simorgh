import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import Image from '#psammead/psammead-image/src';
import notes from '../README.md';
import Bulletin from '.';

const BulletinComponent = ({
  script,
  service,
  mediaType,
  hasImage,
  dir,
  text,
}) => {
  const ctaLink = 'https://bbc.co.uk';

  const isLive = boolean('Live', false);
  const withSummary = boolean('With summary', true);
  const ctaText = mediaType === 'audio' ? 'Listen' : 'Watch';
  const offScreenText = isLive ? `${ctaText} Live` : ctaText;
  const imageSizes = [300, 450, 600, 1024];
  const imageSrc =
    'https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

  const image = (
    <Image
      src={imageSrc.replace('[WIDTH]', 660)}
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
      dir={dir}
      image={hasImage && image}
      mediaType={mediaType}
      headlineText={text}
      summaryText={withSummary ? text : null}
      ctaLink={ctaLink}
      ctaText={ctaText}
      isLive={isLive}
      offScreenText={offScreenText}
      ariaId={ctaLink}
    />
  );
};

storiesOf('Components/Bulletin', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'Tv Bulletin',
    ({ text: textSnipet, script, service, dir }) => (
      <BulletinComponent
        script={script}
        service={service}
        dir={dir}
        mediaType="video"
        hasImage
        text={textSnipet}
      />
    ),
    { notes },
  )
  .add(
    'Radio Bulletin',
    ({ text: textSnipet, script, service, dir }) => {
      const hasImage = boolean('With Image', true);

      return (
        <BulletinComponent
          script={script}
          service={service}
          dir={dir}
          mediaType="audio"
          hasImage={hasImage}
          text={textSnipet}
        />
      );
    },
    { notes },
  );
