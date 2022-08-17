import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import StyledLink from './index.styles';
import PromoContext from '../PromoContext';

const Link = ({ className, children }) => {
  const { to, eventTrackingData, ariaLabelledBy } = useContext(PromoContext);
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
};

Link.defaultProps = {
  className: '',
};

export default Link;
