import React, { use } from 'react';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import makeRelativeUrlPath from '../../../../lib/utilities/makeRelativeUrlPath';
import StyledLink from './index.styles';
import PromoContext from '../PromoContext';

const Link = ({ className = '', children }) => {
  const { to, eventTrackingData, ariaLabelledBy } = use(PromoContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  return (
    <StyledLink
      data-testid="promo-link"
      className={`${className} focusIndicatorDisplayInlineBlock`}
      href={makeRelativeUrlPath(to)}
      aria-labelledby={ariaLabelledBy}
      onClick={eventTrackingData ? handleClickTracking : null}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
