import { screen } from '@testing-library/react';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Paragraph from '.';
import { TV_PAGE } from '../../../routes/utils/pageTypes';

describe('MediaPageBlocks Paragraph', () => {
  it('should render correctly', () => {
    render(
      <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" />,
      { service: 'news' },
    );
    expect(screen.getByText('Example text')).toBeInTheDocument();
  });

  it('should render correctly - dark mode', () => {
    render(
      <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" />,
      {
        service: 'news',
        pageType: TV_PAGE,
      },
    );
    expect(screen.getByText('Example text')).toBeInTheDocument();
  });

  describe("when text isn't provided", () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <ServiceContextProvider service="news">
        <Paragraph uuid="uuid" idAttr="idAttr" />
      </ServiceContextProvider>,
    );
  });
});
