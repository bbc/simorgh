/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import {
  Recommend,
  Warning,
  Activity,
} from '../../DocsDecorator/HealthFactors/Icons';
import ThemeProvider from '../../../src/app/components/ThemeProvider';
import { getActionCount } from '../../helpers/healthFactors';
import { SidebarLabelProps } from '../types';
import VisuallyHiddenText from '../../../src/app/components/VisuallyHiddenText';

const HealthFactorsSidebarLabel = ({ metadata, name }: SidebarLabelProps) => {
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
          <VisuallyHiddenText>{`, Component Health, ${status}.`}</VisuallyHiddenText>
          <span css={styles.iconWrapper}>{actionIcon}</span>
        </span>
      </div>
    </ThemeProvider>
  );
};

export default HealthFactorsSidebarLabel;
