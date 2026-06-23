import { useState, useId } from 'react';
import { BookmarkIcon, FilledBookmarkIcon, Close } from '#app/components/icons';
import Spinner from '#app/components/Spinner';
import styles from './index.styles';
import VisuallyHiddenText from '../VisuallyHiddenText';

export interface SaveButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isUpdating?: boolean;
  isSaved?: boolean;
  disabled?: boolean;
  buttonText?: string;
  removeText?: string;
  testId?: string;
}

const SaveButton = ({
  onClick,
  isLoading = false,
  isUpdating = false,
  isSaved = false,
  disabled = false,
  buttonText,
  removeText = '',
  testId,
}: SaveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const labelId = useId();

  const buttonLabel =
    isHovered && isSaved && !isUpdating ? removeText : buttonText;

  return (
    <button
      css={[styles.buttonWrapper, isUpdating && styles.updatingState]}
      type="button"
      aria-labelledby={labelId}
      onClick={onClick}
      disabled={disabled || isLoading || isUpdating}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...(testId && { 'data-testid': testId })}
    >
      <span aria-hidden="true" css={styles.iconText}>
        {(isLoading || isUpdating) && <Spinner />}
        {!isLoading && !isUpdating && !isSaved && <BookmarkIcon />}
        {!isLoading &&
          !isUpdating &&
          isSaved &&
          (isHovered ? (
            <Close width="20" height="20" />
          ) : (
            <FilledBookmarkIcon />
          ))}
        {buttonLabel}
      </span>

      <VisuallyHiddenText id={labelId} aria-live="polite">
        {buttonLabel}
      </VisuallyHiddenText>
    </button>
  );
};

export default SaveButton;
