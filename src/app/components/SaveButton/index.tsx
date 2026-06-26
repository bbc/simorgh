import { useState, useId } from 'react';
import { BookmarkIcon, FilledBookmarkIcon, Close } from '#app/components/icons';
import Spinner from '#app/components/Spinner';
import styles from './index.styles';
import VisuallyHiddenText from '../VisuallyHiddenText';

export interface SaveButtonProps {
  visualLabel: string;
  hoverVisualLabel?: string;
  accessibleLabel: string;
  isLoading?: boolean;
  isUpdating?: boolean;
  isSaved?: boolean;
  disabled?: boolean;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  testId?: string;
}

const SaveButton = ({
  visualLabel,
  hoverVisualLabel,
  accessibleLabel,
  isLoading = false,
  isUpdating = false,
  isSaved = false,
  disabled = false,
  onClick,
  testId,
}: SaveButtonProps) => {
  const [isFocusedOrHovered, setIsFocusedOrHovered] = useState(false);
  const labelId = useId();

  const isBusy = isLoading || isUpdating;

  // Hover/focus only changes the visual affordance, never the accessible name.
  const showRemoveAffordance = isSaved && !isUpdating && isFocusedOrHovered;
  const displayedVisualLabel =
    showRemoveAffordance && hoverVisualLabel ? hoverVisualLabel : visualLabel;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isBusy) return;
    onClick(event);
  };

  return (
    <button
      css={[styles.buttonWrapper, isUpdating && styles.updatingState]}
      type="button"
      aria-labelledby={labelId}
      aria-busy={isBusy}
      onClick={handleClick}
      disabled={disabled || isBusy}
      onMouseEnter={() => setIsFocusedOrHovered(true)}
      onMouseLeave={() => setIsFocusedOrHovered(false)}
      onFocus={() => setIsFocusedOrHovered(true)}
      onBlur={() => setIsFocusedOrHovered(false)}
      {...(testId && { 'data-testid': testId })}
    >
      <span aria-hidden="true" css={styles.iconText}>
        {isBusy && <Spinner />}
        {!isBusy && !isSaved && <BookmarkIcon />}
        {!isBusy &&
          isSaved &&
          (showRemoveAffordance ? (
            <Close width="20" height="20" />
          ) : (
            <FilledBookmarkIcon />
          ))}
        {displayedVisualLabel}
      </span>

      <VisuallyHiddenText id={labelId} aria-live="polite">
        {accessibleLabel}
      </VisuallyHiddenText>
    </button>
  );
};

export default SaveButton;
