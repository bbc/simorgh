import React, { useContext } from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import Text from '../Text';

export type SaveForLaterTooltipStatus = 'success' | 'error' | 'removed';

export interface SaveForLaterTooltipProps {
  status: SaveForLaterTooltipStatus;
  onClose: () => void;
}

const StatusIcon = ({ status }: { status: SaveForLaterTooltipStatus }) =>
  status === 'error' ? (
    <InfoTriangle css={styles.icon} />
  ) : (
    <InfoCircle css={styles.icon} />
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
    <div css={styles.wrapper}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        css={styles.container}
        data-testid="save-for-later-tooltip"
      >
        <StatusIcon status={status} />

        <div css={styles.content}>
          <Text css={styles.title}>{title}</Text>

          {body && <Text css={styles.body}>{body}</Text>}
        </div>

        <button
          type="button"
          css={styles.closeButton}
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
