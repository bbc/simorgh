import React from 'react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { Services } from '#app/models/types/global';
import {
  render,
  screen,
} from '../../../../components/react-testing-library-with-providers';

import LatestMediaSection from '.';
import hausaArticle from '../../../../../../data/hausa/articles/cxr0765kxlzo.json';
import afaanoromooArticle from '../../../../../../data/afaanoromoo/articles/crgqplm3rmyo.json';
import { LatestMedia } from './LatestMediaTypes';

const Fixture = ({
  content,
  service = 'hausa',
}: {
  content: LatestMedia[] | null;
  service?: Services;
}) => {
  return (
    <ServiceContextProvider service={service}>
      <ToggleContextProvider>
        <LatestMediaSection content={content} />
      </ToggleContextProvider>
    </ServiceContextProvider>
  );
};

describe('Latest Media Section', () => {
  it('should render 4 list items within <ul> tags', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    const { container } = render(<Fixture content={hausaLatestMediaList} />);

    const listItems = screen.getAllByRole('listitem');
    const list = container.querySelector('ul');
    expect(listItems.length).toBe(4);
    expect(list).toBeInTheDocument();
  });

  it('should return empty section if theres no latest media', () => {
    const { container } = render(<Fixture content={null} />);

    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  it('should return empty section if theres zero latest media', () => {
    const { container } = render(
      <Fixture content={[] as unknown as LatestMedia[]} />,
    );

    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  it('should render default title if no translation is available', () => {
    const noTranslationForService = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<Fixture content={noTranslationForService} />);

    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('should render correct translated title if a translation is available', () => {
    const translationAvailForService = afaanoromooArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(
      <Fixture content={translationAvailForService} service="afaanoromoo" />,
    );

    expect(screen.getByText('Haaraa')).toBeInTheDocument();
  });

  it('should have a region role', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<Fixture content={hausaLatestMediaList} />);

    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a section label, labelled by the section label id', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    const { container } = render(<Fixture content={hausaLatestMediaList} />);

    const ariaLabel = container
      .querySelector(`section`)
      ?.getAttribute('aria-labelledby');
    expect(ariaLabel).toMatch('latest-media-heading');
    const regionLabelId = screen
      .getByRole('region')
      .getAttribute('aria-labelledBy');
    const LabelLabelId = screen.getByText('Latest').getAttribute('id');
    expect(regionLabelId).toBe(LabelLabelId);
  });

  it('should render RelatedContent component without <ul> and <li> when given single item in collection', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<Fixture content={[hausaLatestMediaList[0]]} />);

    const listItems = screen.queryAllByRole('listitem');
    const list = screen.queryByRole('list');

    expect(listItems.length).toBe(0);
    expect(list).toBeNull();
  });
});
