import React, { forwardRef } from 'react';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

// Transparent border is to show the top of the wrapper and button border in high-contrast mode
const transparentBorderHeight = '0.0625rem';

const Wrapper = ({ service, children, ...props }) => {
  // Get dynamic styles for service
  const serviceStyles = service ? getSansRegular(service) : {};
  
  return (
    <div
      className="bg-consent-background border-t border-transparent"
      style={{
        ...serviceStyles,
        borderTopWidth: transparentBorderHeight
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const CenterWrapper = ({ children, ...props }) => (
  <div
    className="max-w-screen-lg mx-auto px-double py-44 pt-44 pb-double group-2:px-double group-2:py-44 group-2:pt-44 group-2:pb-double group-3:px-double group-3:py-quad group-3:pt-quad group-3:pb-quad"
    {...props}
  >
    {children}
  </div>
);

const FocusableH2 = forwardRef(({ className, children, dir }, ref) => {
  // tabIndex="-1" enables the h2 to be focussed
  return (
    <h2 className={className} dir={dir} tabIndex="-1" ref={ref}>
      {children}
    </h2>
  );
});

const Title = ({ script, children, className = '', ...props }) => {
  // Get dynamic styles for script
  const scriptStyles = script ? getDoublePica(script) : {};
  
  return (
    <FocusableH2 
      className={`text-white font-bold pt-4 m-0 focus:outline-none ${className}`}
      style={{
        ...scriptStyles
      }}
      {...props}
    >
      {children}
    </FocusableH2>
  );
};

/*
 * The '& li + li' below allows for styling every `li` element except the first.
 */
const Options = ({ script, children, ...props }) => {
  // Get dynamic styles for script
  const scriptStyles = script ? getLongPrimer(script) : {};
  
  return (
    <ul
      className="flex flex-col items-center text-consent-action font-semibold p-0 m-0 list-none group-3:flex-row group-3:justify-between"
      style={{
        ...scriptStyles
      }}
      {...props}
    >
      {children}
    </ul>
  );
};

export const ConsentBannerText = ({ script, children, ...props }) => {
  // Get dynamic styles for script
  const scriptStyles = script ? getBodyCopy(script) : {};
  
  return (
    <p
      className="mt-double mb-triple text-consent-content group-3:mt-triple"
      style={{
        ...scriptStyles
      }}
      {...props}
    >
      {children}
    </p>
  );
};

// Style `button` and `a` as children due to inability to set `on`
// prop on styled component as required for the amp useage
const ListItem = ({ script, children, className = '', ...props }) => {
  // Get dynamic styles for script
  const scriptStyles = script ? getLongPrimer(script) : {};
  
  return (
    <li
      className={`text-center w-full break-words ${className}`}
      style={{
        ...scriptStyles
      }}
      {...props}
    >
      {children}
    </li>
  );
};

export const ConsentBanner = ({
  dir = 'ltr',
  title,
  text,
  accept,
  reject,
  hide = null,
  id = null,
  hidden = null,
  script,
  service,
  headingRef = null,
}) => (
  <Wrapper dir={dir} hidden={hidden} id={id} service={service}>
    <CenterWrapper dir={dir}>
      <Title dir={dir} script={script} ref={headingRef}>
        {title}
      </Title>
      {text}
      <Options dir={dir} script={script} role="list">
        <ListItem 
          dir={dir} 
          script={script}
          className="li-not-first:mt-double li-not-first:pt-double li-not-first:pb-double li-not-first:flex li-not-first:items-center li-not-first:justify-center group-3:li-not-first:mt-0"
        >
          {accept}
        </ListItem>
        <ListItem 
          dir={dir} 
          script={script}
          className="li-not-first:mt-double li-not-first:pt-double li-not-first:pb-double li-not-first:flex li-not-first:items-center li-not-first:justify-center group-3:li-not-first:mt-0"
        >
          <span>{reject}</span>
        </ListItem>
        {hide && (
          <ListItem 
            className="hide w-11 h-11 absolute top-0 right-0 m-0 p-0" 
            dir={dir} 
            script={script}
          >
            <div>{hide}</div>
          </ListItem>
        )}
      </Options>
    </CenterWrapper>
  </Wrapper>
);
