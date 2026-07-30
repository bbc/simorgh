import React from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.styles';
import Text from '../Text';

export type ActionTooltipStatus = 'success' | 'error' | 'removed';

export type TooltipContent = Record<
  ActionTooltipStatus,
  {
    title: React.ReactNode;
    body?: string;
  }
>;

export interface ActionTooltipProps {
  status: ActionTooltipStatus;
  content: TooltipContent;
  closeLabel: string;
  onClose: () => void;
}

const StatusIcon = ({ status }: { status: ActionTooltipStatus }) =>
  status === 'error' ? (
    <InfoTriangle css={styles.icon} />
  ) : (
    <InfoCircle css={styles.icon} />
  );

const ActionTooltip = ({
  status,
  content,
  closeLabel,
  onClose,
}: ActionTooltipProps) => {
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
