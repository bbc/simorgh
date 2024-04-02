import React from 'react';
import styled from '@emotion/styled';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { MEDIA_TYPES } from '#components/Promo';
import withServicesDecorator from '#storybook/withServicesDecorator';
import Promo from '.';

const Wrapper = styled.div`
  max-width: 30rem;
`;

const Component = () => {
  return (
    <Wrapper>
      <Promo {...fixture.data.curations[0].summaries[0]} />
    </Wrapper>
  );
};

// eslint-disable-next-line react/prop-types
const WithMediaIndicator = () => {
  return (
    <Wrapper>
      <Promo
        {...fixture.data.curations[0].summaries[0]}
        type={MEDIA_TYPES.VIDEO}
        duration={123}
      />
      <Promo
        {...fixture.data.curations[0].summaries[0]}
        type={MEDIA_TYPES.PHOTO_GALLERY}
        duration={123}
      />
    </Wrapper>
  );
};

export default {
  title: 'Components/Curation/Promo - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withServicesDecorator],
};

export const Example = Component;
export const Media = WithMediaIndicator;
