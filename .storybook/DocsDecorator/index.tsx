import React from 'react';
import { DocsContainer, Title, Heading } from '@storybook/addon-docs';
import styles from './index.styles';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import SingleDoc from './SingleDoc';
import { DocsContextProps } from '@storybook/addon-docs';

const DocsDecorator = ({
  context,
  children,
}: {
  context: DocsContextProps;
  children: any;
}) => {
  const title = path(
    ['parameters', 'docs', 'component', 'title'],
    context,
  ) as string;

  const metadata = path(['parameters', 'metadata'], context) as string;
  const designLocation = path(['screenReaderUx'], metadata) as string;
  const ACLocation = path(
    ['accessibilityAcceptanceCriteria'],
    metadata,
  ) as string;
  const swarmLocation = path(['accessibilitySwarm'], metadata) as string;

  const documentation = [
    {
      docTitle: 'UX Accessibility Documentation',
      docLocation: designLocation,
      announce: 'screenreader UX',
      missingAnnounce: 'How to make screenreader UX docs',
      missingLink: '',
    },
    {
      docTitle: 'Accessibility Acceptance Criteria',
      docLocation: ACLocation,
      announce: 'Acceptance criteria',
      missingAnnounce: 'How to write accessibility ACs',
      missingLink:
        'https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html',
    },
    {
      docTitle: 'Accessibility Swarm',
      docLocation: swarmLocation,
      announce: 'Swarm template',
      missingAnnounce: 'How to run an accessibility swarm',
      missingLink:
        'https://bbc.github.io/accessibility-news-and-you/guides/accessibility-acceptance-criteria.html',
    },
  ];

  return (
    <DocsContainer context={context}>
      {metadata ? (
        <ThemeProvider service={'news'} variant={'default'}>
          <Title>{title}</Title>
          <aside>
            <Heading>External Documentation</Heading>
            <ul css={styles.documentationList}>
              {documentation.map(item => {
                const {
                  docTitle,
                  docLocation,
                  announce,
                  missingAnnounce,
                  missingLink,
                } = item;
                return (
                  <SingleDoc
                    docTitle={docTitle}
                    docLocation={docLocation}
                    announce={announce}
                    missingAnnounce={missingAnnounce}
                    missingLink={missingLink}
                  />
                );
              })}
            </ul>
          </aside>
        </ThemeProvider>
      ) : null}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;
