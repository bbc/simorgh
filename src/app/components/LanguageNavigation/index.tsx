import React from 'react';
import CollapsibleNavigation from '#app/components/CollapsibleNavigation';
import { TypographyScript } from '#app/models/types/theming';
import Navigation from '#psammead/psammead-navigation/src';
import { Direction, Services } from '#app/models/types/global';
import sections from './constants';

type Props = {
  script: TypographyScript;
  service: Services;
  dir: Direction;
};
const LanguageNavigation = ({ script, service, dir }: Props) => (
  <Navigation script={script} service={service} dir={dir}>
    <CollapsibleNavigation navigationSections={sections} as={React.Fragment} />
  </Navigation>
);

export default LanguageNavigation;
