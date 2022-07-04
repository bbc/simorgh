import React from 'react';
import { node, string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler.js';
import StyledLink from './index.styles';

const Link = ({ className, children, to, id, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledLink
      className={className}
      href={to}
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
  to: string,
  id: string.isRequired,
  eventTrackingData: shape({ block: { componentName: string } }),
};

Link.defaultProps = {
  className: '',
  to: '',
  eventTrackingData: null,
};

export default Link;
