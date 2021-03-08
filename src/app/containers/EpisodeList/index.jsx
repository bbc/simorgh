import React from 'react';
import styled from '@emotion/styled';
import { C_CLOUD_LIGHT } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { string, shape, arrayOf, oneOf, element, bool } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

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
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px ${C_CLOUD_LIGHT} solid;
  }
`;

const EpisodeList = ({
  children,
  script,
  service,
  dir,
  darkMode,
  ulProps,
  liProps,
}) => {
  if (!children.length) return null;

  const hasMultipleChildren = children.length > 1;

  return (
    <EpisodeContext.Provider value={{ script, service, dir, darkMode }}>
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
  darkMode: bool,
  ulProps: shape({}),
  liProps: shape({}),
};

EpisodeList.defaultProps = {
  children: [],
  dir: 'ltr',
  darkMode: false,
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
