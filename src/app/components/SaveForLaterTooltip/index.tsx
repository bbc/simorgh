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
import Text from '../Text';

export type SaveForLaterTooltipStatus = 'success' | 'error' | 'removed';

export interface SaveForLaterTooltipProps {
  status: SaveForLaterTooltipStatus;
  onClose: () => void;
}

const StatusIcon = ({ status }: { status: SaveForLaterTooltipStatus }) =>
  status === 'error' ? (
    <InfoTriangle css={iconStyles} />
  ) : (
    <InfoCircle css={iconStyles} />
  );

const SaveForLaterTooltip = ({ status, onClose }: SaveForLaterTooltipProps) => {
  const { translations } = useContext(ServiceContext);
  const { saveForLaterTooltip } = translations;

  if (!saveForLaterTooltip) return null;

  const { success, error, removed, myNewsUrl, myNewsLinkText, closeLabel } =
    saveForLaterTooltip;

  const myNewsLink = <a href={myNewsUrl}>{myNewsLinkText}</a>;

  const content: Record<
    SaveForLaterTooltipStatus,
    { title: React.ReactNode; body?: string }
  > = {
    success: {
      title: (
        <>
          {success.titleBefore} {myNewsLink} {success.titleAfter}
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
          {removed.titleBefore} {myNewsLink} {success.titleAfter}
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
          <Text css={titleStyles}>{title}</Text>
          {body && <Text css={bodyStyles}>{body}</Text>}
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
