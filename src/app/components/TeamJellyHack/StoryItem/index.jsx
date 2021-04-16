import React from 'react';
import styled from '@emotion/styled';
import { bool, func, string } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/dist/spacings';
import { C_EBON, C_POSTBOX } from '@bbc/psammead-styles/dist/colours';
import { getSansRegular } from '@bbc/psammead-styles/dist/font-styles';

const THUMBNAIL_DIAMETER = '5rem';

const StyledStoryItem = styled.li`
  cursor: pointer;
  margin-right: ${GEL_SPACING};
  margin-left: ${GEL_SPACING};
  ${({ hasViewed }) => (hasViewed ? 'opacity: 50%;' : '')}
`;

const TopicImage = styled.img`
  border-radius: 50%;
  width: ${THUMBNAIL_DIAMETER};
  height: ${THUMBNAIL_DIAMETER};
  border: 0.1875rem solid ${C_POSTBOX};
  ${({ hasViewed }) => (hasViewed ? `border-color: ${C_EBON};` : '')}
`;

const TopicName = styled.strong`
  ${getSansRegular('hindi')}
  display: block;
  margin-top: ${GEL_SPACING};
  text-align: center;
`;

const StoryItem = ({ onClick, id, hasViewed, name, src }) => {
  return (
    <StyledStoryItem hasViewed={hasViewed} onClick={() => onClick(id)}>
      <TopicImage hasViewed={hasViewed} src={src} alt={name} />
      <TopicName>{name}</TopicName>
    </StyledStoryItem>
  );
};

StoryItem.propTypes = {
  onClick: func.isRequired,
  id: string.isRequired,
  hasViewed: bool.isRequired,
  name: string.isRequired,
  src: string.isRequired,
};

export default StoryItem;
