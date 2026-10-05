import { useState, useId } from 'react';
import {
  BookmarkIcon,
  FilledBookmarkIcon,
  Close,
  PlusIcon,
  TickIcon,
} from '#app/components/icons';
import Spinner from '#app/components/Spinner';
import styles from './index.module.scss';
import VisuallyHiddenText from '../VisuallyHiddenText';

export type SaveButtonVariant = 'save' | 'follow';

export interface SaveButtonProps {
  visualLabel: string;
  hoverVisualLabel?: string;
  accessibleLabel: string;
  isLoading?: boolean;
  isUpdating?: boolean;
  isSaved?: boolean;
  variant?: SaveButtonVariant;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  testId?: string;
}

const SaveButton = ({
  visualLabel,
  hoverVisualLabel,
  accessibleLabel,
  isLoading = false,
  isUpdating = false,
  isSaved = false,
  variant = 'save',
  onClick,
  testId,
  ...rest
}: SaveButtonProps) => {
  const [isFocusedOrHovered, setIsFocusedOrHovered] = useState(false);
  const labelId = useId();

  const isBusy = isLoading || isUpdating;

  // Hover/focus only changes the visual affordance, never the accessible name.
  const showRemoveAffordance = isSaved && !isUpdating && isFocusedOrHovered;
  const displayedVisualLabel =
    showRemoveAffordance && hoverVisualLabel ? hoverVisualLabel : visualLabel;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Guard activation in JS instead of using the disabled attribute, so the
    // button keeps focus and is never announced by screen readers as "unavailable"
    if (isBusy) return;
    onClick(event);
  };

  const getIcon = () => {
    if (isBusy) return <Spinner />;
    if (variant === 'follow') {
      if (!isSaved) return <PlusIcon />;
      return showRemoveAffordance ? (
        <Close width="20" height="20" />
      ) : (
        <TickIcon />
      );
    }
    if (!isSaved) return <BookmarkIcon />;
    return showRemoveAffordance ? (
      <Close width="20" height="20" />
    ) : (
      <FilledBookmarkIcon />
    );
  };

  const className = [
    styles.buttonWrapper,
    variant === 'follow' && styles.followVariant,
    variant === 'follow' && isSaved && styles.savedState,
    isUpdating && styles.updatingState,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      type="button"
      aria-labelledby={labelId}
      onClick={handleClick}
      onMouseEnter={() => setIsFocusedOrHovered(true)}
      onMouseLeave={() => setIsFocusedOrHovered(false)}
      onFocus={() => setIsFocusedOrHovered(true)}
      onBlur={() => setIsFocusedOrHovered(false)}
      {...(testId && { 'data-testid': testId })}
      {...rest}
    >
      <span aria-hidden="true" className={styles.iconText}>
        {getIcon()}
        {/* Wrapper keeps the label in a stable element so browser translation
            tools swapping text nodes don't crash React reconciliation. */}
        <span>{displayedVisualLabel}</span>
      </span>

      <VisuallyHiddenText id={labelId} aria-live="assertive">
        {accessibleLabel}
      </VisuallyHiddenText>
    </button>
  );
};

export default SaveButton;
