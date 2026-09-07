import { screen } from '@testing-library/react';
import { render } from '../../../../../components/react-testing-library-with-providers';
import relatedItems from '../../testHelpers/relatedItems';
import IndexAlsosContainer from '../../testHelpers/IndexAlsosContainer';

describe('Index Alsos', () => {
  it('should render multiple correctly', () => {
    render(<IndexAlsosContainer alsoItems={relatedItems} />);
    expect(screen.getAllByRole('link').length).toBeGreaterThan(1);
  });

  it('should render one correctly', () => {
    render(<IndexAlsosContainer alsoItems={[relatedItems[0]]} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
