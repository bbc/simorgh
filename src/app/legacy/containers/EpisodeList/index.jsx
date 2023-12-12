import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { string, shape, arrayOf, oneOf, element } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';

import { EpisodeContext } from './helpers';
import Episode from './Episode';
import Link from './Link';
import Title from './Title';
import Description from './Description';
import DateTimeDuration from './DateTimeDuration';
import Image from './Image';
import MediaIndicator from './MediaIndicator';

const StyledEpisodeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledEpisodeListItem = styled.li`
  padding: ${GEL_SPACING_DBL} 0;
  line-height: 0;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
  &:not(:last-of-type) {
    border-bottom: 1px ${props => props.theme.palette.CLOUD_LIGHT} solid;
  }
`;

const EpisodeList = ({ children, script, service, dir, ulProps, liProps }) => {
  if (!children.length) return null;

  const hasMultipleChildren = children.length > 1;

  return (
    <EpisodeContext.Provider value={{ script, service, dir }}>
      {hasMultipleChildren ? (
        <StyledEpisodeList role="list" {...ulProps}>
          {children.map(child => (
            <StyledEpisodeListItem key={child.key} {...liProps}>
              {child}
            </StyledEpisodeListItem>
          ))}
        </StyledEpisodeList>
      ) : (
        children
      )}
    </EpisodeContext.Provider>
  );
};

EpisodeList.propTypes = {
  children: arrayOf(element),
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  ulProps: shape({}),
  liProps: shape({}),
};

EpisodeList.defaultProps = {
  children: [],
  dir: 'ltr',
  ulProps: {},
  liProps: {},
};

EpisodeList.Episode = Episode;
EpisodeList.Link = Link;
EpisodeList.Title = Title;
EpisodeList.Image = Image;
EpisodeList.MediaIndicator = MediaIndicator;
EpisodeList.Description = Description;
EpisodeList.DateTimeDuration = DateTimeDuration;

export default EpisodeList;
