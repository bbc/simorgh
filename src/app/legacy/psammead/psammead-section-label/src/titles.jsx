/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import {
  getLongPrimer,
  getDoublePica,
} from '#psammead/gel-foundations/src/typography';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GHOST } from '#app/components/ThemeProvider/palette';

const minClickableHeightPx = 44;
const minClickableHeightRem = minClickableHeightPx / 16;

const paddingDir = ({ dir }) => `padding-${dir === 'rtl' ? 'left' : 'right'}`;
const paddingReverseDir = ({ dir }) =>
  `padding-${dir === 'rtl' ? 'right' : 'left'}`;

// Flex doesn't work right on IE11.
// This makes it work right. I don't fully understand how, but am
// eternally grateful to the Flexbugs project.
// https://github.com/philipwalton/flexbugs#flexbug-3
const FlexColumn = ({ children }) => (
  <span className="flex flex-col">
    {children}
  </span>
);

const SectionLabelLink = ({ children, className = '', ...props }) => (
  <a
    className={`text-ebon no-underline hover:underline focus:underline focusIndicatorDisplayBlock ${className}`}
    {...props}
  >
    {children}
  </a>
);

const FlexRow = ({ children, ...props }) => (
  <span 
    className="flex flex-row flex-nowrap justify-between items-baseline group-3:items-stretch"
    style={{ minHeight: `${minClickableHeightRem}rem` }}
    {...props}
  >
    {children}
  </span>
);

const Title = ({ script, service, backgroundColor = GHOST, dir, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getDoublePica(script) : {};
  const serviceStyles = service ? getSansBold(service) : {};
  
  const bgClass = backgroundColor === GHOST ? 'bg-ghost' : 'bg-white';
  const paddingClass = dir === 'rtl' ? 'pl-double group-3:pl-double' : 'pr-double group-3:pr-double';
  
  return (
    <span
      className={`${bgClass} dark:bg-gray-900 dark:text-gray-100 my-double group-3:my-0 ${paddingClass} flex items-center`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </span>
  );
};

const IndexLinkCta = ({ script, service, backgroundColor, dir, children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getLongPrimer(script) : {};
  const serviceStyles = service ? getSansBold(service) : {};
  
  const bgClass = backgroundColor === GHOST ? 'bg-ghost' : 'bg-white';
  const paddingClass = dir === 'rtl' ? 'pr-double' : 'pl-double';
  
  return (
    <span
      className={`my-double group-3:my-0 text-ebon ${bgClass} whitespace-nowrap ${paddingClass} flex items-center`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export const PlainTitle = ({
  children: title,
  dir,
  labelId,
  script,
  service,
  backgroundColor = GHOST,
}) => (
  <FlexColumn>
    <FlexRow>
      <Title
        script={script}
        dir={dir}
        id={labelId}
        service={service}
        backgroundColor={backgroundColor}
      >
        {title}
      </Title>
    </FlexRow>
  </FlexColumn>
);

export const LinkTitle = ({
  children: title,
  dir,
  href,
  labelId,
  linkText,
  script,
  service,
  backgroundColor = GHOST,
}) => (
  <SectionLabelLink
    href={href}
    labelId={labelId}
    className="focusIndicatorDisplayBlock"
  >
    <FlexColumn>
      <FlexRow role="text">
        <Title
          id={labelId}
          dir={dir}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </Title>
        <IndexLinkCta
          dir={dir}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
          aria-hidden="true"
        >
          {linkText}
        </IndexLinkCta>
      </FlexRow>
    </FlexColumn>
  </SectionLabelLink>
);
