import React from 'react';
import { useStorybookApi } from '@storybook/api';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '../../src/app/legacy/psammead/psammead-visually-hidden-text/src';
import styles from './index.styles';
import {
  Confirm,
  Close,
  ExternalLink,
} from '../DocsDecorator/HealthFactors/Icons/icons';

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

  const kind = pathOr('', ['kind'], story) as string;

  const lowerCaseKind = kind.toLowerCase();
  const exemptedFoldersList = ['docs', 'coding standards', 'new components'];
  const regexPatter = RegExp(
    exemptedFoldersList.map(folderName => `^${folderName}/.*`).join('|'),
    'g',
  );
  const exempt = regexPatter.test(lowerCaseKind);

  if (!story || exempt) {
    return name;
  }

  const status = [];

  return (
    <div css={[styles.SidebarLabelWrapper]}>
      <span role="text">
        {name}
        <VisuallyHiddenText>, Component Health: {status}</VisuallyHiddenText>
      </span>
      <span css={[styles.IconWrapper]}>
        <Confirm />
      </span>
    </div>
  );
};

export default SidebarLabel;
