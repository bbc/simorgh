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
  isSaving?: boolean;
  isRemoving?: boolean;
  isSaved?: boolean;
  disabled?: boolean;
  buttonText: string;
  removeText?: string;
}

const SaveButton = ({
  onClick,
  isLoading = false,
  isSaving = false,
  isRemoving = false,
  isSaved = false,
  disabled = false,
  buttonText,
  removeText = '',
}: SaveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMutating = isSaving || isRemoving;

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
