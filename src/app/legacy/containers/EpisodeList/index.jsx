import React, { useMemo } from 'react';
import { EpisodeContext } from './helpers';
import Episode from './Episode';
import Link from './Link';
import Title from './Title';
import Description from './Description';
import DateTimeDuration from './DateTimeDuration';
import Image from './Image';
import MediaIndicator from './MediaIndicator';

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
        <ul role="list" className="list-none p-0 m-0" {...ulProps}>
          {children.map(child => (
            <li
              key={child.key}
              className="py-double leading-none first:pt-0 last:pb-0 not-last:border-b not-last:border-cloud-light"
              {...liProps}
            >
              {child}
            </li>
          ))}
        </ul>
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
