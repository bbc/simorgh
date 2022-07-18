import React from 'react';
import { node, string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import StyledLink from './index.styles';

const Link = ({ className, children, to, a11yId, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledLink
      className={className}
      href={to}
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
  to: string,
  a11yId: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

Link.defaultProps = {
  className: '',
  to: '',
  eventTrackingData: null,
};

export default Link;
