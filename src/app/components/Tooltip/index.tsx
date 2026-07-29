import React, { useContext } from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import Text from '../Text';
import Link from '../Footer/Link';

export type ActionTooltipStatus = 'success' | 'error' | 'removed';

export interface ActionTooltipProps {
  status: ActionTooltipStatus;
  onClose: () => void;
}

const StatusIcon = ({ status }: { status: ActionTooltipStatus }) =>
  status === 'error' ? (
    <InfoTriangle css={styles.icon} />
  ) : (
    <InfoCircle css={styles.icon} />
  );

const ActionTooltip = ({ status, onClose }: ActionTooltipProps) => {
  const { translations } = useContext(ServiceContext);
  const { actionTooltip } = translations;

  if (!actionTooltip) return null;

  const { success, error, removed, myNewsUrl, myNewsLinkText, closeLabel } =
    actionTooltip;

  const myNewsLink = <Link href={myNewsUrl} text={myNewsLinkText} inline />;
  const content: Record<
    ActionTooltipStatus,
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
          {removed.titleBefore} {myNewsLink} {removed.titleAfter}
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
        data-testid="action-tooltip"
      >
        <div css={styles.content}>
          <div css={styles.header}>
            <StatusIcon status={status} />

            <Text size="bodyCopy" fontVariant="sansBold" css={styles.title}>
              {title}
            </Text>

            <button
              type="button"
              css={styles.closeButton}
              onClick={onClose}
              data-testid="action-tooltip-close"
            >
              <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
              <Close width="20" height="20" />
            </button>
          </div>

          {body && (
            <Text size="greatPrimer" css={styles.body}>
              {body}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionTooltip;
