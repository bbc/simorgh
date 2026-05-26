import { use } from 'react';

import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import makeRelativeUrlPath from '../../../../lib/utilities/makeRelativeUrlPath';
import PromoContext from '../PromoContext';
import StyledLink from './index.styles';

const Link = ({ className = '', children }) => {
  const { to, eventTrackingData, ariaLabelledBy } = use(PromoContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  return (
    <StyledLink
      data-testid="promo-link"
      className={`${className} focusIndicatorDisplayInlineBlock`}
      href={makeRelativeUrlPath(to)}
      aria-labelledby={ariaLabelledBy}
      {...(eventTrackingData && handleClickTracking)}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
