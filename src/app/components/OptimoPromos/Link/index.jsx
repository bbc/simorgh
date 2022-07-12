import React from 'react';
import { node, string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import StyledLink from './index.styles';

const Link = ({ className, children, toLink, id, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledLink
      className={className}
      href={toLink}
      aria-labelledby={id}
      onClick={eventTrackingData ? handleClickTracking : null}
    >
      {children}
    </StyledLink>
  );
};

Link.propTypes = {
  className: string,
  children: node.isRequired,
  toLink: string,
  id: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

Link.defaultProps = {
  className: '',
  toLink: '',
  eventTrackingData: null,
};

export default Link;
