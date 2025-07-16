/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import VisuallyHiddenText from '../../../../../components/VisuallyHiddenText';

const StyledIndexAlsos = ({ children, ...props }) => (
  <div className="relative z-10 pt-double" {...props}>
    {children}
  </div>
);

const StyledIndexAlso = ({ children, ...props }) => (
  <div className="border-t border-lunar py-double" {...props}>
    {children}
  </div>
);

const StyledIndexAlsosUl = ({ children, ...props }) => (
  <ul className="list-none p-0 m-0" role="list" {...props}>
    {children}
  </ul>
);

// `display: inline-block` has been used to resolve Focus Indicator bug in Firefox high contrast mode.
const StyledIndexAlsosLink = ({ script, service, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getBrevier(script) : {};
  const serviceStyles = service ? getSerifMedium(service) : {};
  
  return (
    <a
      className={`text-ebon no-underline inline-block hover:underline focus:underline visited:text-metal [&_svg]:m-0 ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </a>
  );
};

const IndexAlsosLink = ({
  children,
  script,
  service,
  url,
  mediaIndicator = null,
  mediaType = null,
}) => {
  const sanitisedUrl = url.replace(/\W/g, '');

  return (
    <StyledIndexAlsosLink
      href={url}
      script={script}
      service={service}
      className="focusIndicatorDisplayInlineBlock"
      // Line 63 and id={`IndexAlsosLink-${sanitisedUrl}`} in line 68 are temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      {...(mediaIndicator && {
        'aria-labelledby': `IndexAlsosLink-${sanitisedUrl}`,
      })}
    >
      {mediaIndicator ? (
        <>
          {mediaIndicator}
          <span role="text" id={`IndexAlsosLink-${sanitisedUrl}`}>
            <VisuallyHiddenText>{`${mediaType}, `}</VisuallyHiddenText>
            <span>{children}</span>
          </span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </StyledIndexAlsosLink>
  );
};

export const IndexAlsos = props => {
  const { offScreenText = null, children } = props;

  return (
    <StyledIndexAlsos {...props}>
      <VisuallyHiddenText as="h4">{offScreenText}</VisuallyHiddenText>
      {children}
    </StyledIndexAlsos>
  );
};

export const IndexAlsosUl = ({ children }) => (
  <StyledIndexAlsosUl>{children}</StyledIndexAlsosUl>
);

export const IndexAlsosLi = ({ ...props }) => (
  <StyledIndexAlso as="li" role="listitem">
    <IndexAlsosLink {...props} />
  </StyledIndexAlso>
);

export const IndexAlso = ({ ...props }) => (
  <StyledIndexAlso>
    <IndexAlsosLink {...props} />
  </StyledIndexAlso>
);
