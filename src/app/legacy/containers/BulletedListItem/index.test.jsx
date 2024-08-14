import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import BulletedListItemContainer from './index';
import { listItemA, listItemB } from '../BulletedList/fixtures';

describe('BulletedListItemContainer', () => {
  it('should render text correctly', () => {
    const { container } = render(
      <BulletedListItemContainer blocks={listItemA.model.blocks} />,
      {
        service: 'news',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl text correctly', () => {
    const { container } = render(
      <BulletedListItemContainer blocks={listItemB.model.blocks} />,
      {
        service: 'arabic',
      },
    );
    expect(container).toMatchSnapshot();
  });
});
