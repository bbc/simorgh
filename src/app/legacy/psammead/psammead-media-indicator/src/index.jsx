import React from 'react';
import { getMinion } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';

const StyledMediaIndicator = ({ service, script, dir, isInline, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getMinion(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const inlineClasses = isInline 
    ? `inline-block align-middle ${dir === 'rtl' ? 'pl-double' : 'pr-double'}`
    : 'block';
  
  return (
    <div
      className={`text-ebon bg-white ${inlineClasses}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const FlexWrapper = ({ children }) => (
  <div className="flex items-center h-full">
    {children}
  </div>
);

const MediaIndicator = ({
  type = 'video',
  script,
  service,
  dir = 'ltr',
  isInline = false,
  children = null,
}) => (
  <StyledMediaIndicator
    data-e2e="media-indicator"
    aria-hidden="true"
    script={script}
    service={service}
    dir={dir}
    isInline={isInline}
  >
    <FlexWrapper>
      {mediaIcons[type]}
      {children}
    </FlexWrapper>
  </StyledMediaIndicator>
);

export default MediaIndicator;
