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
  isSaved?: boolean;
  disabled?: boolean;
  buttonText: string;
  removeText?: string;
}

const SaveButton = ({
  onClick,
  isLoading = false,
  isSaved = false,
  disabled = false,
  buttonText,
  removeText = '',
}: SaveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      css={styles.buttonWrapper}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {isLoading && <Spinner css={styles.buttonAnimation} />}
      {!isLoading && !isSaved && <BookmarkIcon />}
      {!isLoading &&
        isSaved &&
        (isHovered ? <Close width="20" height="20" /> : <FilledBookmarkIcon />)}
      {isHovered && isSaved ? removeText : buttonText}
    </button>
  );
};

export default SaveButton;
