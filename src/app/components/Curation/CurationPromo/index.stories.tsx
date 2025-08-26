import React from 'react';
import styled from '@emotion/styled';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { MEDIA_TYPES } from '#components/Promo';
import Promo from '.';
import { Summary } from '#app/models/types/curationData';

const Wrapper = styled.div`
  max-width: 30rem;
`;

const summaryFixtureData = fixture.data.curations[0].summaries[0] as Summary;

const Component = () => {
  return (
    <Wrapper>
      <Promo {...summaryFixtureData} />
    </Wrapper>
  );
};

const WithMediaIndicator = () => {
  return (
    <Wrapper>
      <Promo {...summaryFixtureData} type={MEDIA_TYPES.VIDEO} duration={123} />
      <Promo
        {...summaryFixtureData}
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
};

export const Example = Component;
export const Media = WithMediaIndicator;
