import { useState } from 'react';
import {
  Spinner,
  BookmarkIcon,
  FilledBookmarkIcon,
  Close,
} from '#app/components/icons';
import { Theme } from '@emotion/react';
import styles from './index.styles';

export interface ActionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isSaved?: boolean;
  disabled?: boolean;
  label: string;
  buttonText: string;
  removeText?: string;
}

const ActionButton = ({
  onClick,
  isLoading = false,
  isSaved = false,
  disabled = false,
  label,
  buttonText,
  removeText = '',
}: ActionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      css={(theme: Theme) => styles.buttonWrapper(theme)}
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
        (isHovered ? <Close /> : <FilledBookmarkIcon />)}
      {isHovered && isSaved ? removeText : buttonText}
    </button>
  );
};

export default ActionButton;
