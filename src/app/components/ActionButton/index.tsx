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
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={label}
      title={label}
    >
      {buttonText}
    </button>
  );
};

export default ActionButton;
