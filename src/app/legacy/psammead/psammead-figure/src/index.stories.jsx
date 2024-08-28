import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Caption from '#psammead/psammead-caption/src';
import Image from '#psammead/psammead-image/src';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import Paragraph from '#psammead/psammead-paragraph/src';
import VisuallyHiddenText from '#components/VisuallyHiddenText';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import Figure from '.';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const imageWidth = 853;
const imageRatio = 125;

storiesOf('Components/Figure', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'containing Image',
    () => (
      <Figure>
        <Image alt={imageAlt} src={imageSrc} width={imageWidth} />
      </Figure>
    ),
    { notes },
  )
  .add(
    'containing Image, ImagePlaceholder and Caption',
    ({ text: textSnippet, script, service }) => (
      <Figure>
        <ImagePlaceholder ratio={imageRatio}>
          <Image alt={imageAlt} src={imageSrc} width={imageWidth} />
        </ImagePlaceholder>
        <Caption service={service} script={script}>
          <VisuallyHiddenText>
            {text(
              'visually hidden caption',
              'Image caption, ',
              'Visually Hidden Caption',
            )}
          </VisuallyHiddenText>
          <Paragraph script={script} service={service}>
            {textSnippet}
          </Paragraph>
          <Paragraph script={script} service={service}>
            {textSnippet}
          </Paragraph>
          <Paragraph script={script} service={service}>
            {textSnippet}
          </Paragraph>
        </Caption>
      </Figure>
    ),
    { notes, knobs: { escapeHTML: false } },
  );
