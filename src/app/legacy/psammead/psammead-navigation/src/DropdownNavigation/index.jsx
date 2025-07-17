import React, { cloneElement, useRef } from 'react';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { Helmet } from 'react-helmet';
import VisuallyHiddenText from '../../../../../components/VisuallyHiddenText';

export const NAV_BAR_TOP_BOTTOM_SPACING = 0.75; // 12px

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-bind"
      src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
    />
  </Helmet>
);

const expandedHandler =
  'AMP.setState({ menuState: { expanded: !menuState.expanded }})';

const initialState = { expanded: false };

export const CanonicalDropdown = ({ isOpen, children }) => {
  const heightRef = useRef(null);
  const height = heightRef.current ? heightRef.current.scrollHeight : 0;

  return (
    <div
      className={`
        bg-white clear-both overflow-hidden transition-all duration-200 ease-out
        ${isOpen ? 'visible' : 'invisible h-0'}
        group-3:hidden group-3:invisible
        motion-reduce:transition-none
      `}
      style={{
        height: isOpen ? `${height}px` : '0px',
        transitionTimingFunction: 'cubic-bezier(0, 0, 0.58, 1)',
      }}
      data-e2e="dropdown-nav"
      ref={heightRef}
    >
      {children}
    </div>
  );
};

export const AmpDropdown = ({ children, ...props }) => (
  <div
    className="bg-white clear-both group-3:hidden group-3:invisible"
    {...props}
  >
    {children}
  </div>
);

export const DropdownUl = ({ children, ...props }) => (
  <ul
    className="list-none m-0 px-full border-b border-grey-3"
    role="list"
    {...props}
  >
    {children}
  </ul>
);

export const DropdownLi = ({
  children,
  script,
  clickTracker = null,
  currentPageText = null,
  active = false,
  service,
  url,
  dir = 'ltr',
  viewTracker = null,
}) => {
  const ariaId = `dropdownNavigation-${children
    .replace(/\s+/g, '-')
    .toLowerCase()}`;
  return (
    // aria-labelledby is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    <li
      className="py-3 border-b border-grey-3 last:pb-half last:border-0"
      role="listitem"
      {...viewTracker}
    >
      <a
        className="text-pica font-sans-regular text-grey-10 no-underline py-half-trpl inline-block hover:underline hover:decoration-postbox focus:underline focus:decoration-postbox"
        href={url}
        aria-labelledby={ariaId}
        {...clickTracker}
      >
        {active && currentPageText ? (
          // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          <span 
            className={`${dir === 'ltr' ? 'border-l-half border-postbox pl-full' : 'border-r-half border-postbox pr-full'}`}
            id={ariaId}
            role="text"
          >
            <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
            {children}
          </span>
        ) : (
          // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          <span id={ariaId}>{children}</span>
        )}
      </a>
    </li>
  );
};

export const CanonicalMenuButton = ({
  announcedText,
  isOpen,
  onClick,
  dir = 'ltr',
  script,
}) => (
  <button
    className={`
      relative p-0 m-0 bg-transparent border-0 cursor-pointer
      ${dir === 'ltr' ? 'float-left' : 'float-right'}
      h-12 w-12 focusIndicatorRemove
      group-3:hidden group-3:invisible
      hover:shadow-[inset_0_0_0_0.5rem_white]
      focus:shadow-[inset_0_0_0_0.5rem_white]
      hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:border-half hover:after:border-black
      focus:after:content-[''] focus:after:absolute focus:after:inset-0 focus:after:border-half focus:after:border-black
    `}
    onClick={onClick}
    aria-expanded={isOpen ? 'true' : 'false'}
    type="button"
  >
    <span className="align-middle">
      {isOpen ? navigationIcons.cross : navigationIcons.hamburger}
    </span>
    <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
  </button>
);

export const AmpMenuButton = ({
  announcedText,
  onToggle,
  dir = 'ltr',
  script,
}) => (
  <>
    <AmpHead />
    <amp-state id="menuState">
      <script
        type="application/json"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }}
      />
    </amp-state>
    <button
      className={`
        relative p-0 m-0 bg-transparent border-0 cursor-pointer
        ${dir === 'ltr' ? 'float-left' : 'float-right'}
        h-12 w-12 focusIndicatorRemove
        group-3:hidden group-3:invisible
        hover:shadow-[inset_0_0_0_0.5rem_white]
        focus:shadow-[inset_0_0_0_0.5rem_white]
        hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:border-half hover:after:border-black
        focus:after:content-[''] focus:after:absolute focus:after:inset-0 focus:after:border-half focus:after:border-black
      `}
      aria-expanded="false"
      data-amp-bind-aria-expanded='menuState.expanded ? "true" : "false"'
      on={`tap:${expandedHandler},${onToggle}`}
      type="button"
    >
      <span className="align-middle">
        {cloneElement(navigationIcons.hamburger, {
          'data-amp-bind-hidden': 'menuState.expanded',
        })}
        {cloneElement(navigationIcons.cross, {
          hidden: true,
          'data-amp-bind-hidden': '!menuState.expanded',
        })}
      </span>
      <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
    </button>
  </>
);
