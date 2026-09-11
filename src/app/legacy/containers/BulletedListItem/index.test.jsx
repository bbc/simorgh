import { screen } from '@testing-library/react';
import { render } from '../../../components/react-testing-library-with-providers';
import BulletedListItemContainer from './index';
import { listItemA, listItemB } from '../BulletedList/fixtures';

describe('BulletedListItemContainer', () => {
  it('should render text correctly', () => {
    render(<BulletedListItemContainer blocks={listItemA.model.blocks} />, {
      service: 'news',
    });
    expect(screen.getByText('Here is a list')).toBeInTheDocument();
  });

  it('should render rtl text correctly', () => {
    render(<BulletedListItemContainer blocks={listItemB.model.blocks} />, {
      service: 'arabic',
    });
    expect(screen.getByText('It is unordered')).toBeInTheDocument();
  });
});
