import React, { useEffect, useId, useRef } from 'react';
import { Close, InfoCircle, InfoTriangle } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useDismissOnOutsideInteraction from '#app/hooks/useDismissOnOutsideInteraction';
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
  ...rest
}: ActionTooltipProps) => {
  const { title, body } = content[status];
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    // Store the previously focused element to restore focus when the tooltip is unmounted
    previouslyFocusedElementRef.current =
      document.activeElement as HTMLElement | null;

    return () => {
      previouslyFocusedElementRef.current?.focus({ focusVisible: true });
    };
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
    containerRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [status]);

  useDismissOnOutsideInteraction({ containerRef, onDismiss: onClose });

  return (
    <div className={styles.wrapper} {...rest}>
      <div
        ref={containerRef}
        role="group"
        aria-labelledby={titleId}
        className={styles.container}
        data-testid="action-tooltip"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          data-testid="action-tooltip-close"
        >
          <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
          <Close width="20" height="20" />
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <StatusIcon status={status} />

            <Text
              as="h2"
              id={titleId}
              size="pica"
              fontVariant="sansBold"
              className={styles.title}
            >
              {title}
            </Text>
          </div>

          {body && (
            <Text as="p" size="bodyCopy" className={styles.body}>
              {body}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionTooltip;
