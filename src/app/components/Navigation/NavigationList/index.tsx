import { PropsWithChildren } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { Direction } from '#app/models/types/global';
import styles from './index.styles';

type NavigationListItemProps = {
  url: string;
  active?: boolean;
  currentPageText?: string;
  dir?: Direction;
  clickTracker?: Record<string, unknown> | null;
  viewTracker?: Record<string, unknown> | null;
};

type CurrentLinkProps = PropsWithChildren<{
  linkId: string;
  currentPageText: string;
}>;

const CurrentLink = ({
  linkId,
  children: link,
  currentPageText,
}: CurrentLinkProps) => (
  <span
    css={styles.currentLinkSpan}
    // eslint-disable-next-line jsx-a11y/aria-role
    role="text"
    // Temporary fix for a11y nested span bug in TalkBack: https://github.com/bbc/simorgh/issues/9652
    id={`NavigationLinks-${linkId}`}
  >
    <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
    {link}
  </span>
);

export const NavigationList = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>) => (
  <ul css={styles.list} role="list" {...props}>
    {children}
  </ul>
);

export const NavigationListItem = ({
  children: link,
  url,
  clickTracker = null,
  currentPageText,
  active = false,
  dir = 'ltr',
  viewTracker = null,
  ...anchorProps
}: PropsWithChildren<NavigationListItemProps>) => (
  <li
    css={styles.listItem}
    dir={dir}
    role="listitem"
    {...(viewTracker as object)}
  >
    {active && currentPageText ? (
      <a
        css={styles.link}
        href={url}
        // Temporary fix for a11y nested span bug in TalkBack: https://github.com/bbc/simorgh/issues/9652
        aria-labelledby={`NavigationLinks-${link}`}
        aria-current="page"
        className="focusIndicatorRemove"
        data-active="true"
        {...(clickTracker as object)}
        {...anchorProps}
      >
        <CurrentLink linkId={link as string} currentPageText={currentPageText}>
          {link}
        </CurrentLink>
      </a>
    ) : (
      <a
        css={styles.link}
        href={url}
        className="focusIndicatorRemove"
        aria-current={active ? 'page' : undefined}
        {...(clickTracker as object)}
        {...anchorProps}
      >
        {link}
      </a>
    )}
  </li>
);
