import { css, Theme, useTheme } from '@emotion/react';
import { Pin } from '../icons';

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
    border: `1px solid ${palette.GREY_6}`,
    borderRadius: `${spacings.FULL}rem`,
    padding: `${spacings.HALF}rem`,
    color: palette.GREY_8,
    cursor: 'pointer',
    lineHeight: 0,
    transition:
      'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
    ':hover, :focus-visible': {
      color: palette.POSTBOX,
      borderColor: palette.POSTBOX,
      backgroundColor: palette.GHOST,
    },
    '.pin-icon': {
      width: `${spacings.FULL + spacings.HALF}rem`,
      height: `${spacings.FULL + spacings.HALF}rem`,
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
      <Pin className="pin-icon" />
    </button>
  );
};

export default PinButton;
