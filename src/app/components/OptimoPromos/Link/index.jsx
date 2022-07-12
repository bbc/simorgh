import React from 'react';
import { node, string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import StyledLink from './index.styles';

const Link = ({ className, children, toLink, a11yId, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledLink
      className={className}
      href={toLink}
      aria-labelledby={a11yId}
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
  a11yId: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

Link.defaultProps = {
  className: '',
  toLink: '',
  eventTrackingData: null,
};

export default Link;
