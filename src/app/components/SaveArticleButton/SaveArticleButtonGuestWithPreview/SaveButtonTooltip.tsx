import { css } from '@emotion/react';
import Text from '#app/components/Text';

interface SaveButtonTooltipProps {
  isSaved?: boolean;
}

const styles = {
  tooltip: css({
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#fff',
    color: '#222',
    border: '1px solid #ccc',
    borderRadius: '4px',
    whiteSpace: 'normal',
    maxWidth: '280px',
    width: 'max-content',
    minWidth: '200px',
    zIndex: 1000,
    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    textAlign: 'center',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-8px',
      borderWidth: '8px',
      borderStyle: 'solid',
      borderColor: '#fff transparent transparent transparent',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-9px',
      borderWidth: '9px',
      borderStyle: 'solid',
      borderColor: '#ccc transparent transparent transparent',
      zIndex: -1,
    },
  }),
};

const SaveButtonTooltip = ({ isSaved = false }: SaveButtonTooltipProps) => {
  const unsavedText =
    'Save this article for later. It will appear in your My News page.';
  const savedText = 'This article is saved temporarily in your My News page.';

  const tooltipText = isSaved ? savedText : unsavedText;

  return (
    <div css={styles.tooltip} role="tooltip">
      <Text size="brevier" fontVariant="sansRegular" css={{ color: '#222' }}>
        {tooltipText}
      </Text>
    </div>
  );
};

export default SaveButtonTooltip;
