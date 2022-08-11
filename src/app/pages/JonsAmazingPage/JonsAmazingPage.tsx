import { css, Theme } from '@emotion/react';

import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import Text from '../../components/Text';

const wrapperStyles = css({
  width: '63rem',
  margin: '0 auto',
});

const JonsAmazingPage = () => (
  <main css={[wrapperStyles]}>
    <Heading level={2}>Hello</Heading>
    <Paragraph>This is the future.</Paragraph>
    <Text
      size="atlas"
      fontFamilyVariant="secondary"
      css={[
        {
          fontWeight: 'bold',
          ':first-child': {
            display: 'block',
          },
        },
      ]}
    >
      This some text
    </Text>
  </main>
);

export default JonsAmazingPage;
