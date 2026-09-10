import { css } from '@emotion/react';
import { use } from 'react';
import Text from '#app/components/Text';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#app/contexts/ServiceContext';

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
  link: css({
    display: 'inline',
  }),
};

const SaveButtonTooltip = ({ isSaved = false }: SaveButtonTooltipProps) => {
  const { service } = use(ServiceContext);
  const myNewsPath = `/${service}/my-news`;

  const unsavedText =
    'Want to read this later? Save this article and find it in your temporary My News page.';
  
  const savedTextBefore = 'This article is saved temporarily in your';
  const savedTextLink = 'My News page';
  const savedTextAfter = '.';

  return (
    <div css={styles.tooltip} role="tooltip">
      <Text size="brevier" fontVariant="sansRegular" css={{ color: '#222' }}>
        {isSaved ? (
          <>
            {savedTextBefore}{' '}
            <CallToActionLink url={myNewsPath} css={styles.link}>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                {savedTextLink}
              </CallToActionLink.Text>
            </CallToActionLink>
            {savedTextAfter}
          </>
        ) : (
          unsavedText
        )}
      </Text>
    </div>
  );
};

export default SaveButtonTooltip;
