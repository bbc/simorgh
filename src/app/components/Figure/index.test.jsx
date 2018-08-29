import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Figure from './index';
import Image from './Image';
import Caption from './Caption';
import VisuallyHiddenText from '../VisuallyHiddenText';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const captionValue = 'This is a caption';
const copyrightText = 'Copyright Getty images';

describe('Figure', () => {
  describe('with a caption', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Figure>
        <Image alt={imageAlt} src={imageSrc} />
        <Caption>{captionValue}</Caption>
      </Figure>,
    );
  });

  describe('without a caption', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Figure>
        <Image alt={imageAlt} src={imageSrc} />
      </Figure>,
    );
  });

  describe('with non-BBC copyright', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Figure>
        <Image alt={imageAlt} src={imageSrc} />
        <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
      </Figure>,
    );
  });

  describe('with caption and non-BBC copyright', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Figure>
        <Image alt={imageAlt} src={imageSrc} />
        <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
        <Caption>{captionValue}</Caption>
      </Figure>,
    );
  });
});
