import React, { use } from 'react';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import makeRelativeUrlPath from '../../../../lib/utilities/makeRelativeUrlPath';
import StyledLink from './index.styles';
import PromoContext from '../PromoContext';

const Link = ({ className = '', children }) => {
  const { to, eventTrackingData, ariaLabelledBy } = use(PromoContext);
  const href = makeRelativeUrlPath(to);
  const handleClickTracking = useCombinedClickTrackerHandler({
    eventTrackingData,
    staticUrl: href,
  });

  return (
    <StyledLink
      data-testid="promo-link"
      className={`${className} focusIndicatorDisplayInlineBlock`}
      href={href}
      aria-labelledby={ariaLabelledBy}
      {...(eventTrackingData && handleClickTracking)}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
