import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';

import arabic from '../../../../../components/ThemeProvider/fontScripts/arabic';
import bengali from '../../../../../components/ThemeProvider/fontScripts/bengali';
import burmese from '../../../../../components/ThemeProvider/fontScripts/burmese';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';

import MostReadList from '.';
import { getItemWrapperArray } from '../../utilities';

describe('MostReadList', () => {
  shouldMatchSnapshot(
    'should render with ltr news items with correct dir',
    <MostReadList numberOfItems={10}>
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'news',
        script: latin,
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with rtl arabic items with correct dir',
    <MostReadList numberOfItems={10} dir="rtl">
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'persian',
        script: arabic,
        dir: 'rtl',
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with ltr bengali items with correct dir',
    <MostReadList numberOfItems={10}>
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'bengali',
        script: bengali,
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with ltr burmese items with correct dir',
    <MostReadList numberOfItems={10}>
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'burmese',
        script: burmese,
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with ltr news items with a max of one column',
    <MostReadList numberOfItems={10} columnLayout="oneColumn">
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'news',
        script: latin,
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with ltr news items with a max of two columns',
    <MostReadList numberOfItems={10} columnLayout="twoColumn">
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'news',
        script: latin,
      })}
    </MostReadList>,
  );

  shouldMatchSnapshot(
    'should render with ltr news items with a multi column layout',
    <MostReadList numberOfItems={10} columnLayout="multiColumn">
      {getItemWrapperArray({
        numberOfItems: 10,
        service: 'news',
        script: latin,
      })}
    </MostReadList>,
  );
});
