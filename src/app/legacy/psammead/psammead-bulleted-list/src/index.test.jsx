import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import BulletedList, { BulletedListItem } from './index';

const ltrProps = {
  dir: 'ltr',
  script: latin,
  service: 'news',
};

const rtlProps = {
  dir: 'rtl',
  script: arabic,
  service: 'arabic',
};

describe('PsammeadBulletedList', () => {
  it('should confirm that the list-style is none, so that screen-readers do not read out "bullet"', () => {
    const { getByText } = render(
      <BulletedList {...ltrProps}>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listEl = getByText('First item on the list').parentNode;
    const style = window.getComputedStyle(listEl);
    expect(style.listStyleType).toBe('none');
  });

  it('should confirm that the list and list items have proper roles', () => {
    const { getByText } = render(
      <BulletedList {...ltrProps}>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listItemEl = getByText('First item on the list');
    const listEl = listItemEl.parentNode;
    expect(listEl.getAttribute('role')).toBe('list');
    expect(listItemEl.getAttribute('role')).toBe('listitem');
  });

  it('should confirm that the margin-top property is zero', () => {
    const { getByText } = render(
      <BulletedList {...ltrProps}>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listItemEl = getByText('First item on the list');
    const listEl = listItemEl.parentNode;
    const style = window.getComputedStyle(listEl);
    expect(style.marginTop).toBe('0px');
  });

  shouldMatchSnapshot(
    'should render correctly with custom bulletPointShape and bulletPointColour',
    <BulletedList
      {...ltrProps}
      bulletPointShape="square"
      bulletPointColour="#f00"
    >
      <BulletedListItem>First item on the list</BulletedListItem>
      <BulletedListItem>Second item on the list</BulletedListItem>
      <BulletedListItem>Final list item</BulletedListItem>
    </BulletedList>,
  );

  shouldMatchSnapshot(
    'should render correctly from ltr',
    <BulletedList {...ltrProps}>
      <BulletedListItem>First item on the list</BulletedListItem>
      <BulletedListItem>Second item on the list</BulletedListItem>
      <BulletedListItem>Final list item</BulletedListItem>
    </BulletedList>,
  );

  shouldMatchSnapshot(
    'should render correctly from rtl',
    <BulletedList {...rtlProps}>
      <BulletedListItem>العنصر الأول في القائمة</BulletedListItem>
      <BulletedListItem>البند الثاني في القائمة</BulletedListItem>
      <BulletedListItem>عنصر القائمة النهائية</BulletedListItem>
    </BulletedList>,
  );
});
