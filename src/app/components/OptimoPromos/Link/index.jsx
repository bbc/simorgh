import React from 'react';
import { node, string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import StyledLink from './index.styles';

const Link = ({
  className,
  children,
  to,
  ariaLabelledBy,
  eventTrackingData,
}) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledLink
      className={className}
      href={to}
      aria-labelledby={ariaLabelledBy}
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
  ariaLabelledBy: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

Link.defaultProps = {
  className: '',
  to: '',
  eventTrackingData: null,
};

export default Link;
