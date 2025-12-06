import { css, Theme, useTheme } from '@emotion/react';
import { Pin, PinFilled } from '../icons';

type PinButtonProps = {
  label: string;
  isPinned?: boolean;
  onClick?: () => void;
  className?: string;
};

const pinButtonStyles = ({ palette, spacings }: Theme) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: palette.GREY_10,
    cursor: 'pointer',
    lineHeight: 0,
    transition:
      'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
    ':hover, :focus-visible': {
      color: palette.POSTBOX,
    },
    '.pin-icon': {
      width: `${spacings.TRIPLE}rem`,
      height: `${spacings.TRIPLE}rem`,
    },
  });

const PinButton = ({
  label,
  isPinned = false,
  onClick,
  className,
}: PinButtonProps) => {
  const theme = useTheme();

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isPinned}
      onClick={onClick}
      css={pinButtonStyles(theme)}
      className={className}
      title={label}
    >
      {isPinned ? (
        <PinFilled className="pin-icon" />
      ) : (
        <Pin className="pin-icon" />
      )}
    </button>
  );
};

export default PinButton;
