import {
  Spinner,
  BookmarkIcon,
  FilledBookmarkIcon,
} from '#app/components/icons';
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
  return (
    <button
      css={styles.buttonWrapper}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={label}
      title={label}
    >
      {isLoading && <Spinner css={styles.buttonAnimation} />}
      {!isLoading && !isSaved && <BookmarkIcon />}
      {!isLoading && isSaved && <FilledBookmarkIcon />}
      {buttonText}
    </button>
  );
};

export default ActionButton;
