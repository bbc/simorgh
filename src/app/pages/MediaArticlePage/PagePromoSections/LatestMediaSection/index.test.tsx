import React from 'react';
import {
  render,
  screen,
} from '#components/react-testing-library-with-providers';

import LatestMediaSection from '.';
import hausaArticle from '../../../../../../data/hausa/articles/cxr0765kxlzo.json';
import tamilArticle from '../../../../../../data/tamil/articles/c84m2jl4dpzo.json';
import { LatestMedia } from './types';

describe('Latest Media Section', () => {
  it('should render 4 list items within <ul> tags', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    const { container } = render(
      <LatestMediaSection content={hausaLatestMediaList} />,
    );

    const listItems = screen.getAllByRole('listitem');
    const list = container.querySelector('ul');
    expect(listItems.length).toBe(4);
    expect(list).toBeInTheDocument();
  });

  it('should return empty section if theres no latest media', () => {
    const { container } = render(<LatestMediaSection content={null} />);

    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  it('should return empty section if theres zero latest media', () => {
    const { container } = render(
      <LatestMediaSection content={[] as unknown as LatestMedia[]} />,
    );

    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  it('should render default title if no translation is available', () => {
    const noTranslationForService = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<LatestMediaSection content={noTranslationForService} />, {
      service: 'hausa',
    });

    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('should render correct translated title if a translation is available', () => {
    const translationAvailForService = tamilArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<LatestMediaSection content={translationAvailForService} />, {
      service: 'tamil',
    });

    expect(screen.getByText('மிகச் சமீபத்தியது')).toBeInTheDocument();
  });

  it('should have a region role', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<LatestMediaSection content={hausaLatestMediaList} />);

    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a section label, labelled by the section label id', () => {
    const hausaLatestMediaList = hausaArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    const { container } = render(
      <LatestMediaSection content={hausaLatestMediaList} />,
      { service: 'hausa' },
    );

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

    render(<LatestMediaSection content={[hausaLatestMediaList[0]]} />, {
      service: 'hausa',
    });

    const listItems = screen.queryAllByRole('listitem');
    const list = screen.queryByRole('list');

    expect(listItems.length).toBe(0);
    expect(list).toBeNull();
  });
});
