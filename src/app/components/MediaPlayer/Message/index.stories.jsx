/* eslint-disable no-alert */
import React from 'react';
import { text } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { withServicesKnob } from '#legacy/psammead-storybook-helpers/src';
import MediaMessageComponent from '.';

const StyledMessageContainer = styled.div`
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
`;

export default {
  title: 'Components/Media Message',
  component: MediaMessageComponent,
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
  decorators: [withServicesKnob({ defaultService: 'ukrainian' })],
};

// eslint-disable-next-line react/prop-types
export const MediaMessage = ({ service }) => {
  const id = text('Message', 'Контент більше не доступний');
  return (
    <StyledMessageContainer>
      <MediaMessageComponent service={service} message={id} />
    </StyledMessageContainer>
  );
};
