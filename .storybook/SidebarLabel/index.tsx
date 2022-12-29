import React from 'react';
/** @jsx jsx */ import { jsx } from '@emotion/core';
import { useStorybookApi } from '@storybook/api';
import path from 'ramda/src/path';
import VisuallyHiddenText from '../../src/app/legacy/psammead/psammead-visually-hidden-text/src';
import styles from './index.styles';
import {
  Recommend,
  Warning,
  Activity,
} from '../DocsDecorator/HealthFactors/Icons/icons';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import { getActionCount, isExempt } from '../helpers/healthFactors';

const SidebarLabel = ({ item }) => {
  const api = useStorybookApi();
  const { isRoot, parameters, name, children } = item;
  const { docsOnly } = parameters ?? {};
  if (isRoot || docsOnly || !children || children.length === 0) {
    return name;
  }

  const basicChild =
    children.find(child => child.match(/--basic$/)) ?? children[0];
  if (!basicChild) {
    return name;
  }

  const story = api.getData(basicChild);

  if (!story || isExempt(story)) {
    return name;
  }

  const metadata = path(['parameters', 'metadata'], story);

  const actionCount = getActionCount(metadata);

  const hasIcon =
    actionCount === 0 ? (
      <Recommend css={styles.recommendIcon} />
    ) : (
      <Warning css={styles.warningIcon} />
    );

  const actionIcon = metadata ? (
    hasIcon
  ) : (
    <Activity css={styles.activityIcon} />
  );

  const statusCount = actionCount === 0 ? 'complete' : 'incomplete';
  const status = metadata ? statusCount : 'missing';

  return (
    <ThemeProvider service="news" variant="default">
      <div css={styles.labelWrapper}>
        <span
          // eslint-disable-next-line jsx-a11y/aria-role
          role="text"
        >
          {name}
          <VisuallyHiddenText>{`, Component Health: ${status}`}</VisuallyHiddenText>
          <span css={styles.iconWrapper}>{actionIcon}</span>
        </span>
      </div>
    </ThemeProvider>
  );
};

export default SidebarLabel;
