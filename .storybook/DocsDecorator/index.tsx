import React from 'react';
import { DocsContainer, Title } from '@storybook/addon-docs';
import styles from './index.styles';
import path from 'ramda/src/path';
import count from 'ramda/src/count';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import SingleDoc from './SingleDoc';
import { DocsContextProps } from '@storybook/addon-docs';
import Heading from '../../src/app/components/Heading';
import { Recommend, Warning } from './Icons/icons';

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

  const uxAccessibility = path(['uxAccessibilityDoc'], metadata);
  const uxSwarm = path(['swarm'], metadata);
  const acceptanceCriteria = path(['acceptanceCriteria'], metadata);

  const getLabel = path(['reference', 'label']);
  const getUrl = path(['reference', 'url']);
  const getDone = path(['done']);

  const actionCount = count(
    x => typeof x === 'undefined' || !getDone(x),
    [uxAccessibility, uxSwarm, acceptanceCriteria],
  );

  const toWord = ['', 'One', 'Two', 'Three'];

  const headline = metadata
    ? actionCount === 0
      ? 'Good to show to the audience'
      : `${toWord[actionCount]} actions outstanding`
    : 'Component health is missing!';

  return (
    // @ts-ignore: type children not assignable.
    <DocsContainer context={context}>
      {metadata ? (
        <ThemeProvider service="news" variant="default">
          <Title>{title}</Title>

          <aside css={styles.componentHealthContainer}>
            <div css={styles.titleContainer}>
              <span css={styles.titleIcon}>
                {actionCount === 0 ? (
                  <Recommend css={styles.recommendIcon} />
                ) : (
                  <Warning css={styles.warningIcon} />
                )}
              </span>
              <Heading size="doublePica" level={2}>
                {headline}
              </Heading>
            </div>

            <ul css={styles.documentationList}>
              <SingleDoc
                label={'Screen reader UX'}
                url={getUrl(uxAccessibility)}
                status={getDone(uxAccessibility)}
                urlLabel={
                  getLabel(uxAccessibility) ||
                  'How to document the screen reader UX'
                }
              />
              <SingleDoc
                label={'Accessibility Acceptance Criteria'}
                url={getUrl(acceptanceCriteria)}
                status={getDone(acceptanceCriteria)}
                urlLabel={
                  getLabel(acceptanceCriteria) ||
                  'How to write accessibility acceptance criteria'
                }
              />
              <SingleDoc
                label={'Accessibility Swarm'}
                url={getUrl(uxSwarm)}
                status={getDone(uxSwarm)}
                urlLabel={
                  getLabel(uxSwarm) || 'How to run an accessibility swarm'
                }
              />
            </ul>
          </aside>
        </ThemeProvider>
      ) : null}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;
