import React, { useContext } from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  wrapperStyles,
  containerStyles,
  iconStyles,
  contentStyles,
  titleStyles,
  bodyStyles,
  closeButtonStyles,
} from './index.styles';

export type SaveForLaterTooltipStatus = 'success' | 'error' | 'removed';

export interface SaveForLaterTooltipProps {
  status: SaveForLaterTooltipStatus;
  onClose: () => void;
}

const FALLBACK_TRANSLATIONS = {
  success: { titleBefore: 'This article is now saved to' },
  error: {
    title: 'Sorry, something went wrong',
    body: 'Check your connection, refresh the page and try again',
  },
  removed: { titleBefore: 'This article has now been removed from' },
  myNewsLinkText: 'My News',
  myNewsUrl: 'https://www.bbc.com/hindi/my-news',
  closeLabel: 'Close',
};

const StatusIcon = ({ status }: { status: SaveForLaterTooltipStatus }) =>
  status === 'error' ? (
    <InfoTriangle css={iconStyles} />
  ) : (
    <InfoCircle css={iconStyles} />
  );

const SaveForLaterTooltip = ({ status, onClose }: SaveForLaterTooltipProps) => {
  const { translations } = useContext(ServiceContext);
  const { success, error, removed, myNewsUrl, myNewsLinkText, closeLabel } =
    translations?.saveForLaterTooltip ?? FALLBACK_TRANSLATIONS;

  const myNewsLink = <a href={myNewsUrl}>{myNewsLinkText}</a>;

  const content: Record<
    SaveForLaterTooltipStatus,
    { title: React.ReactNode; body?: string }
  > = {
    success: {
      title: (
        <>
          {success.titleBefore} {myNewsLink}
        </>
      ),
    },
    error: {
      title: error.title,
      body: error.body,
    },
    removed: {
      title: (
        <>
          {removed.titleBefore} {myNewsLink}
        </>
      ),
    },
  };

  const { title, body } = content[status];

  return (
    <div css={wrapperStyles}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        css={containerStyles}
        data-testid="save-for-later-tooltip"
      >
        <StatusIcon status={status} />
        <div css={contentStyles}>
          <p css={titleStyles}>{title}</p>
          {body && <p css={bodyStyles}>{body}</p>}
        </div>
        <button
          type="button"
          css={closeButtonStyles}
          onClick={onClose}
          data-testid="save-for-later-tooltip-close"
        >
          <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
          <Close width="20" height="20" />
        </button>
      </div>
    </div>
  );
};

export default SaveForLaterTooltip;
