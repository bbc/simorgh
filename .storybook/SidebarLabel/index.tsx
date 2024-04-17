import React from 'react';
import { useStorybookApi } from '@storybook/manager-api';
import path from 'ramda/src/path';
import { isExempt } from '../helpers/healthFactors';
import HealthFactorsSidebarLabel from './HealthFactorsSidebarLabel';

const SidebarLabel = ({ item }) => {
  const api = useStorybookApi();
  const { isRoot, parameters, name, children, isComponent } = item;
  const { docsOnly } = parameters ?? {};

  if (
    !children ||
    children.length === 0 ||
    isRoot ||
    docsOnly ||
    (!isComponent && children.length !== 1)
  ) {
    return name;
  }

  const hasChild = children[0];
  if (!hasChild) {
    return name;
  }

  const story = api.getData(hasChild);

  if (!story || isExempt(story)) {
    return name;
  }

  const metadata = path(['parameters', 'metadata'], story);

  return <HealthFactorsSidebarLabel metadata={metadata} name={name} />;
};

export default SidebarLabel;
