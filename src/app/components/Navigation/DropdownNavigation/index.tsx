import { PropsWithChildren, useRef, cloneElement } from 'react';
import { Helmet } from 'react-helmet';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { Direction } from '#app/models/types/global';
import styles from './index.styles';

type CanonicalDropdownProps = {
  isOpen: boolean;
};

export const CanonicalDropdown = ({
  isOpen,
  children,
}: PropsWithChildren<CanonicalDropdownProps>) => {
  const heightRef = useRef<HTMLDivElement>(null);
  return (
    <div
      data-e2e="dropdown-nav"
      ref={heightRef}
      css={[styles.dropdown, isOpen && styles.dropdownOpen]}
      style={{
        height: `${isOpen && heightRef.current ? heightRef.current.scrollHeight : 0}px`,
      }}
    >
      {children}
    </div>
  );
};

type AmpDropdownProps = {
  id?: string;
  hidden?: boolean;
};

export const AmpDropdown = ({
  children,
  id,
  hidden,
}: PropsWithChildren<AmpDropdownProps>) => (
  <div css={styles.ampDropdown} id={id} hidden={hidden} data-e2e="dropdown-nav">
    {children}
  </div>
);

export const DropdownList = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>) => (
  <ul css={styles.dropdownList} role="list" {...props}>
    {children}
  </ul>
);

type DropdownListItemProps = {
  url: string;
  active?: boolean;
  currentPageText?: string;
  clickTracker?: Record<string, unknown> | null;
  viewTracker?: Record<string, unknown> | null;
};

export const DropdownListItem = ({
  children,
  clickTracker = null,
  currentPageText,
  active = false,
  url,
  viewTracker = null,
}: PropsWithChildren<DropdownListItemProps>) => {
  const ariaId = `dropdownNavigation-${(children as string)
    .replace(/\s+/g, '-')
    .toLowerCase()}`;
  return (
    // aria-labelledby is a temporary fix for the a11y nested span bug in TalkBack: https://github.com/bbc/simorgh/issues/9652
    <li
      css={styles.dropdownListItem}
      role="listitem"
      {...(viewTracker as object)}
    >
      <a
        css={styles.dropdownLink}
        href={url}
        aria-labelledby={ariaId}
        {...(clickTracker as object)}
      >
        {active && currentPageText ? (
          // ID is a temporary fix for the a11y nested span bug in TalkBack: https://github.com/bbc/simorgh/issues/9652
          // eslint-disable-next-line jsx-a11y/aria-role
          <span css={styles.currentLink} id={ariaId} role="text">
            <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
            {children}
          </span>
        ) : (
          // ID is a temporary fix for the a11y nested span bug in TalkBack: https://github.com/bbc/simorgh/issues/9652
          <span id={ariaId}>{children}</span>
        )}
      </a>
    </li>
  );
};

type CanonicalMenuButtonProps = {
  announcedText: string;
  isOpen: boolean;
  onClick: () => void;
  dir?: Direction;
};

export const CanonicalMenuButton = ({
  announcedText,
  isOpen,
  onClick,
  dir = 'ltr',
}: CanonicalMenuButtonProps) => (
  <button
    type="button"
    css={styles.menuButton}
    onClick={onClick}
    aria-expanded={isOpen ? 'true' : 'false'}
    aria-label={announcedText}
    dir={dir}
    className="focusIndicatorRemove"
  >
    {isOpen ? navigationIcons.cross : navigationIcons.hamburger}
    <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
  </button>
);

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

type AmpMenuButtonProps = {
  announcedText: string;
  onToggle: string;
  dir?: Direction;
};

export const AmpMenuButton = ({
  announcedText,
  onToggle,
  dir = 'ltr',
}: AmpMenuButtonProps) => (
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
      type="button"
      css={styles.menuButton}
      aria-expanded="false"
      aria-label={announcedText}
      data-amp-bind-aria-expanded='menuState.expanded ? "true" : "false"'
      on={`tap:${expandedHandler},${onToggle}`}
      dir={dir}
      className="focusIndicatorRemove"
    >
      {cloneElement(navigationIcons.hamburger, {
        'data-amp-bind-hidden': 'menuState.expanded',
      })}
      {cloneElement(navigationIcons.cross, {
        hidden: true,
        'data-amp-bind-hidden': '!menuState.expanded',
      })}
      <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
    </button>
  </>
);
