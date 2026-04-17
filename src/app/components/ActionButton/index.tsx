import { Spinner, BookmarkIcon } from '#app/components/icons';
import styles from './index.styles';

export interface ActionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label: string;
  buttonText: string;
}

const ActionButton = ({
  onClick,
  isLoading = false,
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
      {!isLoading && <BookmarkIcon />}
      {buttonText}
    </button>
  );
};

export default ActionButton;
