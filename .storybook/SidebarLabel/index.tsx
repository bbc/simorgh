import React from 'react';
import { useStorybookApi } from '@storybook/api';
import path from 'ramda/src/path';
import { isExempt } from '../helpers/healthFactors';
import HealthFactorsSidebarLabel from './HealthFactorsSidebarLabel';

const SidebarLabel = ({ item }) => {
  const api = useStorybookApi();
  const { type, parameters, name, children } = item;
  const { docsOnly } = parameters ?? {};
  if (
    ['root', 'group'].includes(type) ||
    docsOnly ||
    !children ||
    children.length === 0
  ) {
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

  return <HealthFactorsSidebarLabel metadata={metadata} name={name} />;
};

export default SidebarLabel;
