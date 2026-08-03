import React from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.module.scss';
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
    <InfoTriangle className={styles.icon} />
  ) : (
    <InfoCircle className={styles.icon} />
  );

const ActionTooltip = ({
  status,
  content,
  closeLabel,
  onClose,
}: ActionTooltipProps) => {
  const { title, body } = content[status];

  return (
    <div className={styles.wrapper}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.container}
        data-testid="action-tooltip"
      >
        <div className={styles.content}>
          <div className={styles.header}>
            <StatusIcon status={status} />

            <Text size="pica" fontVariant="sansBold" className={styles.title}>
              {title}
            </Text>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              data-testid="action-tooltip-close"
            >
              <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
              <Close width="20" height="20" />
            </button>
          </div>

          {body && (
            <Text size="bodyCopy" className={styles.body}>
              {body}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionTooltip;
