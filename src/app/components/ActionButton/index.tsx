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
}

const ActionButton = ({
  onClick,
  isLoading = false,
  isSaved = false,
  disabled = false,
  label,
  buttonText,
}: ActionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      css={(theme: Theme) => styles.buttonWrapper(theme)}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={label}
      title={label}
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
      {isHovered && isSaved ? 'Remove' : buttonText}
    </button>
  );
};

export default ActionButton;
