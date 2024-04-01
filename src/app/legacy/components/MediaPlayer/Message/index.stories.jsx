/* eslint-disable no-alert */
import React from 'react';
import styled from '@emotion/styled';
import MediaMessageComponent from '.';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

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
  decorators: [withServicesDecorator],
};

// eslint-disable-next-line react/prop-types
export const MediaMessage = (_, { service }) => {
  return (
    <StyledMessageContainer>
      <MediaMessageComponent
        service={service}
        message={'Контент більше не доступний'}
      />
    </StyledMessageContainer>
  );
};
