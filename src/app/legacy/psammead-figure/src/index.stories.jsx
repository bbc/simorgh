import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Caption from '@bbc/psammead-caption';
import Copyright from '@bbc/psammead-copyright';
import Image from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Paragraph from '@bbc/psammead-paragraph';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import Figure from '.';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
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
    'containing Image, ImagePlaceholder, Copyright and Caption',
    ({ text: textSnippet, script, service }) => (
      <Figure>
        <ImagePlaceholder ratio={imageRatio}>
          <Image alt={imageAlt} src={imageSrc} width={imageWidth} />
          <Copyright>
            <VisuallyHiddenText>
              {text(
                'visually hidden copyright',
                'Image copyright, ',
                'Visually Hidden Copyright',
              )}
            </VisuallyHiddenText>
            {text('copyright', 'Copyright', 'Copyright')}
          </Copyright>
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
