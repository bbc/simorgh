import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

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
    border-bottom: 1px ${props => props.theme.palette.CLOUD_LIGHT} solid;
  }
`;

const EpisodeList = ({
  children = [],
  script,
  service,
  dir = 'ltr',
  ulProps = {},
  liProps = {},
}) => {
  const episodeListContextValue = useMemo(
    () => ({ script, service, dir }),
    [script, service, dir],
  );
  if (!children.length) return null;

  const hasMultipleChildren = children.length > 1;

  return (
    <EpisodeContext.Provider value={episodeListContextValue}>
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

EpisodeList.Episode = Episode;
EpisodeList.Link = Link;
EpisodeList.Title = Title;
EpisodeList.Image = Image;
EpisodeList.MediaIndicator = MediaIndicator;
EpisodeList.Description = Description;
EpisodeList.DateTimeDuration = DateTimeDuration;

export default EpisodeList;
