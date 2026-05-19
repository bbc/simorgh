import { useState } from 'react';
import {
  Spinner,
  BookmarkIcon,
  FilledBookmarkIcon,
  Close,
} from '#app/components/icons';
import styles from './index.styles';

export interface SaveButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isMutating?: boolean;
  isSaved?: boolean;
  disabled?: boolean;
  buttonText: string;
  removeText?: string;
  testId?: string;
}

const SaveButton = ({
  onClick,
  isLoading = false,
  isMutating = false,
  isSaved = false,
  disabled = false,
  buttonText,
  removeText = '',
  testId,
}: SaveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      css={[styles.buttonWrapper, isMutating && styles.mutatingState]}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading || isMutating}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...(testId && { 'data-testid': testId })}
    >
      {(isLoading || isMutating) && <Spinner css={styles.buttonAnimation} />}
      {!isLoading && !isMutating && !isSaved && <BookmarkIcon />}
      {!isLoading &&
        !isMutating &&
        isSaved &&
        (isHovered ? <Close width="20" height="20" /> : <FilledBookmarkIcon />)}
      {isHovered && isSaved ? removeText : buttonText}
    </button>
  );
};

export default SaveButton;
