import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import ElectionResults from '.';
import wireframeFixture from './fixtures';

describe('ElectionResults', () => {
  it('should render the title', () => {
    render(<ElectionResults results={wireframeFixture} />);

    expect(
      screen.getByRole('heading', { name: 'Presidential election 2027' }),
    ).toBeInTheDocument();
  });

  it('should list the reporting progress', () => {
    render(<ElectionResults results={wireframeFixture} />);

    expect(screen.getByText('reporting: 18 of 36')).toBeInTheDocument();
  });

  it('should list each candidate', () => {
    render(<ElectionResults results={wireframeFixture} />);

    expect(
      screen.getByText(
        'Amina Example (APX, #2E8B57): 34%, 6800000 votes, winner: false',
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(9);
  });

  it('should render nothing without results', () => {
    const { container } = render(
      <ElectionResults
        results={null as unknown as typeof wireframeFixture}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
