import { useState } from 'react';

import {
  BookmarkIcon,
  Close,
  FilledBookmarkIcon,
  Spinner,
} from '#app/components/icons';
import styles from './index.styles';

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

  return (
    <button
      css={[styles.buttonWrapper, isUpdating && styles.updatingState]}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading || isUpdating}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...(testId && { 'data-testid': testId })}
    >
      {(isLoading || isUpdating) && <Spinner css={styles.buttonAnimation} />}
      {!isLoading && !isUpdating && !isSaved && <BookmarkIcon />}
      {!isLoading &&
        !isUpdating &&
        isSaved &&
        (isHovered ? <Close width="20" height="20" /> : <FilledBookmarkIcon />)}
      {isHovered && isSaved ? removeText : buttonText}
    </button>
  );
};

export default SaveButton;
