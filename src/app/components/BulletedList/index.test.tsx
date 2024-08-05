import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import { BulletedList, BulletedListItem } from './index';

describe('BulletedList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render list with a proper role', () => {
    render(
      <BulletedList>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listEl = screen.getByRole('list');
    expect(listEl).toBeInTheDocument();
  });

  it('should render list items with proper roles', () => {
    const { getByText } = render(
      <BulletedList>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listItemEl = getByText('First item on the list');
    expect(listItemEl.getAttribute('role')).toBe('listitem');
  });

  it('should confirm that the list-style is none, so that screen-readers do not read out "bullet', () => {
    const { getByRole } = render(
      <BulletedList>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listEl = getByRole('list');
    const listStyle = window.getComputedStyle(listEl);
    expect(listStyle.listStyleType).toBe('none');
  });

  it('should confirm that the margin-top property is zero', () => {
    const { getByRole } = render(
      <BulletedList>
        <BulletedListItem>First item on the list</BulletedListItem>
      </BulletedList>,
    );
    const listEl = getByRole('list');
    const listStyle = window.getComputedStyle(listEl);
    expect(listStyle.marginTop).toBe('0px');
  });

  it('should render correctly with custom bulletPointShape and bulletPointColour', () => {
    const { container } = render(
      <BulletedList bulletPointShape="square" bulletPointColour="#f00">
        <BulletedListItem>First item on the list</BulletedListItem>
        <BulletedListItem>Second item on the list</BulletedListItem>
        <BulletedListItem>Final list item</BulletedListItem>
      </BulletedList>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly from ltr', () => {
    const { container } = render(
      <BulletedList>
        <BulletedListItem>First item on the list</BulletedListItem>
        <BulletedListItem>Second item on the list</BulletedListItem>
        <BulletedListItem>Final list item</BulletedListItem>
      </BulletedList>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly from rtl', () => {
    const { container } = render(
      <BulletedList>
        <BulletedListItem>العنصر الأول في القائمة</BulletedListItem>
        <BulletedListItem>البند الثاني في القائمة</BulletedListItem>
        <BulletedListItem>عنصر القائمة النهائية</BulletedListItem>
      </BulletedList>,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
});
