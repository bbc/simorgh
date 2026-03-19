import { bylineSamplePost } from 'simorgh-nextjs/pages/[service]/live/[id]/Post/fixture';
import {
  render,
  screen,
  within,
} from '../../react-testing-library-with-providers';
import Contributors from '.';
import bylineExtractor from '../utilities/bylineExtractor';
import filterForBlockType from '../../../lib/utilities/blockHandlers';
import { LIVE_PAGE } from '../../../routes/utils/pageTypes';

const {
  header: {
    model: { blocks: postHeaderBlocks },
  },
} = bylineSamplePost;
const { model: contributorData } = filterForBlockType(
  postHeaderBlocks,
  'contributor',
);
const sampleContributor = bylineExtractor({
  blocks: [contributorData],
  pageType: LIVE_PAGE,
});

describe('Post Contributor', () => {
  it('Should render contributors correctly when the required data is passed', () => {
    render(<Contributors contributorValues={sampleContributor} />);

    const author = screen.getByText('Gahuza contributor');
    const role = screen.getByText('gahuza contributor');
    const image = screen.getByRole('presentation');

    expect(author).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('Should return null when there are no contributors in the data', () => {
    const { container } = render(<Contributors contributorValues={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render a list when required data is passed correctly', () => {
    render(<Contributors contributorValues={sampleContributor} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('should render all listitems correctly', () => {
    render(<Contributors contributorValues={sampleContributor} />);

    const contributor = screen.getByRole('list');
    const contributorItems = within(contributor).getAllByRole('listitem');

    expect(contributorItems.length).toBe(2);
  });

  it('should correctly use the buildIChefURL function to create the image url', () => {
    render(<Contributors contributorValues={sampleContributor} />);

    const image = screen.getByRole('presentation');

    expect(image).toHaveAttribute(
      'src',
      'https://ichef.bbci.co.uk/ace/ws/160/cpsdevpb/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.jpg.webp',
    );
  });

  it.each`
    expectation | info        | text
    ${'Author'} | ${'Author'} | ${'Author,'}
    ${'Role'}   | ${'Role'}   | ${'Role,'}
  `('should correctly announce $expectation for $info', ({ text }) => {
    render(<Contributors contributorValues={sampleContributor} />);

    const findText = screen.getByText(text);

    expect(findText).toBeInTheDocument();
  });

  it.each`
    info        | translation
    ${'author'} | ${'Barreessaa,'}
    ${'role'}   | ${'Gahee,'}
  `('should translate $info announcement correctly', ({ translation }) => {
    render(<Contributors contributorValues={sampleContributor} />, {
      service: 'afaanoromoo',
    });

    const findTranslation = screen.getByText(translation);

    expect(findTranslation).toBeInTheDocument();
  });
});
