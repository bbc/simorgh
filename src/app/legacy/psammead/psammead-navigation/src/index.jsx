import React from 'react';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { NAV_BAR_TOP_BOTTOM_SPACING } from './DropdownNavigation';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SPACING_AROUND_NAV_ITEMS = `${NAV_BAR_TOP_BOTTOM_SPACING}rem`; // 12px
const CURRENT_ITEM_HOVER_BORDER = '0.3125rem'; // 5px

const NavWrapper = ({ children }) => (
  <div className="relative max-w-screen-xl m-0 bg-white group-3:mx-3 large:mx-auto">
    {children}
  </div>
);

const StyledUnorderedList = ({ children, ...props }) => (
  <ul className="list-none p-0 m-0 relative group-3:overflow-hidden" role="list" {...props}>
    {children}
  </ul>
);

const StyledLink = ({ script, service, currentLink, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getPica(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const currentLinkClasses = currentLink 
    ? 'hover:after:border-b-[0.3125rem] hover:after:border-postbox'
    : 'hover:after:border-b-2 hover:after:border-postbox';
  
  return (
    <a
      className={`text-gray-900 cursor-pointer no-underline inline-block outline-none py-3 px-1 max-group-2:px-double relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 hover:after:border-b-2 hover:after:border-postbox ${currentLinkClasses} focus:after:border-b-2 focus:after:border-postbox focus:after:top-0 focus:after:border-2 focus:after:border-black focus-visible:after:border-b-2 focus-visible:after:border-postbox focus-visible:after:top-0 focus-visible:after:border-2 focus-visible:after:border-black focusIndicatorRemove ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles,
        padding: `${SPACING_AROUND_NAV_ITEMS} 0.25rem`,
        ...(window.matchMedia('(max-width: 37.5rem)').matches && {
          padding: `${SPACING_AROUND_NAV_ITEMS} 1rem`
        })
      }}
      {...props}
    >
      {children}
    </a>
  );
};

const StyledListItem = ({ dir, children, ...props }) => (
  <li 
    className="inline-block relative z-10 me-3 max-group-2:last:mr-[6rem] max-group-2:last:ml-[6rem] group-3:after:content-[''] group-3:after:absolute group-3:after:-bottom-px group-3:after:w-[80rem] group-3:after:border-b group-3:after:border-gray-300 group-3:after:-z-10" 
    style={{
      [`&::after`]: {
        [dir === 'ltr' ? 'left' : 'right']: 0
      }
    }}
    role="listitem" 
    {...props}
  >
    {children}
  </li>
);

const StyledSpan = ({ children, ...props }) => (
  <span 
    className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:border-b-2 after:border-postbox" 
    {...props}
  >
    {children}
  </span>
);

const CurrentLink = ({
  linkId,
  children: link,
  script,
  currentPageText = null,
}) => (
  <StyledSpan
    // eslint-disable-next-line jsx-a11y/aria-role
    role="text"
    script={script}
    // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    id={`NavigationLinks-${linkId}`}
  >
    <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
    {link}
  </StyledSpan>
);

export const NavigationUl = ({ children, ...props }) => (
  <StyledUnorderedList {...props}>
    {children}
  </StyledUnorderedList>
);

export const NavigationLi = ({
  children: link,
  url,
  script,
  clickTracker = null,
  currentPageText = null,
  active = false,
  service,
  dir = 'ltr',
  viewTracker = null,
  ...props
}) => {
  return (
    <StyledListItem dir={dir} {...viewTracker}>
      {active && currentPageText ? (
        <StyledLink
          href={url}
          script={script}
          service={service}
          currentLink
          // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          aria-labelledby={`NavigationLinks-${link}`}
          className="focusIndicatorRemove"
          {...clickTracker}
          {...props}
        >
          <CurrentLink
            linkId={link}
            script={script}
            currentPageText={currentPageText}
          >
            {link}
          </CurrentLink>
        </StyledLink>
      ) : (
        <StyledLink
          href={url}
          script={script}
          service={service}
          className="focusIndicatorRemove"
          {...clickTracker}
          {...props}
        >
          {link}
        </StyledLink>
      )}
    </StyledListItem>
  );
};

// ampOpenClass is the class added to the Navigation, and is toggled on tap.
// It indicates whether the menu is open or not. This overrides the background
// color of the Navigation
const StyledNav = ({ isOpen, ampOpenClass, dir, children, ...props }) => {
  const openClasses = isOpen ? 'bg-ebon' : 'bg-white';
  const ampOpenClasses = ampOpenClass ? `max-group-2:${ampOpenClass}:bg-ebon` : '';
  
  return (
    <nav
      className={`relative ${openClasses} ${ampOpenClasses} group-3:after:content-[''] group-3:after:absolute group-3:after:bottom-0 group-3:after:right-0 group-3:after:left-0 group-3:after:border-b group-3:after:border-gray-300`}
      role="navigation"
      dir={dir}
      {...props}
    >
      {children}
    </nav>
  );
};

const Navigation = ({
  children,
  dir = 'ltr',
  isOpen = false,
  ampOpenClass = null,
  ...props
}) => {
  return (
    <StyledNav
      dir={dir}
      isOpen={isOpen}
      ampOpenClass={ampOpenClass}
      {...props}
    >
      <NavWrapper>{children}</NavWrapper>
    </StyledNav>
  );
};

export default Navigation;
