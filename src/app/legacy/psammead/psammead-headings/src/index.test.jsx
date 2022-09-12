import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import { Headline, SubHeading } from './index';

describe('Headline component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Headline script={latin} service="news">
      This is my headline.
    </Headline>,
  );

  shouldMatchSnapshot(
    'should render correctly in dark mode',
    <Headline script={latin} service="news" darkMode>
      This is my headline.
    </Headline>,
  );

  shouldMatchSnapshot(
    'should render correctly with arabic script typography values',
    <Headline script={arabic} service="persian">
      هذا هو العنوان الخاص بي
    </Headline>,
  );
});

describe('SubHeading component', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <SubHeading script={latin} service="news">
      This is a SubHeading
    </SubHeading>,
  );

  shouldMatchSnapshot(
    'should render correctly in dark mode',
    <SubHeading script={latin} service="news" darkMode>
      This is a SubHeading
    </SubHeading>,
  );

  shouldMatchSnapshot(
    'should render correctly with arabic script typography values',
    <SubHeading script={arabic} service="news">
      هذا عنوان فرعي
    </SubHeading>,
  );

  shouldMatchSnapshot(
    'should render correctly with an ID',
    <SubHeading id="This-is-a-SubHeading" script={latin} service="news">
      This is a SubHeading
    </SubHeading>,
  );
});
