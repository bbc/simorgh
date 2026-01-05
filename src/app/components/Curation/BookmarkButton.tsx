import { css, Theme, useTheme } from '@emotion/react';
import { Bookmark, BookmarkFilled } from '../icons';

interface BookmarkButtonProps {
  label: string;
  isBookmarked?: boolean;
  onClick?: () => void;
  className?: string;
}

const bookmarkButtonStyles = ({ palette, spacings }: Theme) =>
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
    '.bookmark-icon': {
      width: `${spacings.TRIPLE}rem`,
      height: `${spacings.TRIPLE}rem`,
    },
  });

const BookmarkButton = ({
  label,
  isBookmarked = false,
  onClick,
  className,
}: BookmarkButtonProps) => {
  const theme = useTheme();

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isBookmarked}
      onClick={onClick}
      css={bookmarkButtonStyles(theme)}
      className={className}
      title={label}
    >
      {isBookmarked ? (
        <BookmarkFilled className="bookmark-icon" />
      ) : (
        <Bookmark className="bookmark-icon" />
      )}
    </button>
  );
};

export default BookmarkButton;
