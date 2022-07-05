import React from 'react';
import { string, shape } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler.js';
import StyledClickableArea from './index.styles';

const ClickableArea = ({ className, to, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  return (
    <StyledClickableArea
      className={className}
      href={to}
      tabIndex={-1}
      aria-hidden
      onClick={eventTrackingData ? handleClickTracking : null}
    />
  );
};

ClickableArea.propTypes = {
  className: string,
  to: string,
  eventTrackingData: shape({ block: { componentName: string } }),
};

ClickableArea.defaultProps = {
  className: '',
  to: '',
  eventTrackingData: null,
};

export default ClickableArea;
