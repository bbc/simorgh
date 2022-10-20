import React from 'react';
import {
  DocsContainer,
  Title,
  Heading,
  Description,
} from '@storybook/addon-docs';
import styles from './index.styles';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import SingleDoc from './SingleDoc';

const DocsDecorator = ({ context, children }) => {
  const title = path(['parameters', 'docs', 'component', 'title'], context);
  const description = path(
    ['parameters', 'docs', 'component', 'description'],
    context,
  );

  const metadata = path(['parameters', 'metadata'], context);
  const designLocation = path(['uxDoc'], metadata);
  const a11yUxLocation = path(['a11yUx'], metadata);
  const acceptanceCriteriaLocation = path(['acceptanceCriteria'], metadata);
  const swarmLocation = path(['swarm'], metadata);

  const documentation = [
    {
      docTitle: 'UX Designs',
      docLocation: designLocation,
      missingAnnounce: 'How to make UX docs',
      missingLink: '',
    },
    {
      docTitle: 'Accessibility UX',
      docLocation: a11yUxLocation,
      missingAnnounce: 'How to make screenreader UX docs',
      missingLink:
        'https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html',
    },
    {
      docTitle: 'Accessibility Acceptance Criteria',
      docLocation: acceptanceCriteriaLocation,
      missingAnnounce: 'How to write accessibility ACs',
      missingLink:
        'https://bbc.github.io/accessibility-news-and-you/guides/accessibility-acceptance-criteria.html',
    },
    {
      docTitle: 'Accessibility Swarm',
      docLocation: swarmLocation,
      missingAnnounce: 'How to run an accessibility swarm',
      missingLink:
        'https://paper.dropbox.com/doc/A11Y-Swarm-Template--BrZGLUhfPXwYXFbJ3e17R0vDAg-ZlXZZv1HfJ8KrxlHUMGVl',
    },
  ];
  return (
    <DocsContainer context={context}>
      {metadata ? (
        <ThemeProvider service={'news'} variant={'default'}>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Heading>External Documentation</Heading>
          <ul css={styles.documentationList}>
            {documentation.map(item => {
              const { docTitle, docLocation, missingAnnounce, missingLink } =
                item;
              return (
                <SingleDoc
                  docTitle={docTitle}
                  docLocation={docLocation}
                  missingAnnounce={missingAnnounce}
                  missingLink={missingLink}
                />
              );
            })}
          </ul>
        </ThemeProvider>
      ) : null}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;
