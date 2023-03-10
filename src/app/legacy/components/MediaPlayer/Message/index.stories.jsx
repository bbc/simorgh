/* eslint-disable no-alert */
import React from 'react';
import { text } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import MediaMessageComponent from '.';
import ThemeProvider from '../../../../components/ThemeProvider';

const StyledMessageContainer = styled.div`
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
`;

export default {
  title: 'Components/Media Message/Media Message',
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
    <ThemeProvider service={service}>
      <StyledMessageContainer>
        <MediaMessageComponent service={service} message={id} />
      </StyledMessageContainer>
    </ThemeProvider>
  );
};
