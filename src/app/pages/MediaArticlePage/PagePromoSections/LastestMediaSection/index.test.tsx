import React from 'react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext/__mocks__';
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
    const noTranslationForService = afaanoromooArticle.data.secondaryData
      .latestMedia as LatestMedia[];

    render(<Fixture content={noTranslationForService} service="afaanoromoo" />);

    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('should haver a region role', () => {});

  it('should have a section label, labelled by the section label id', () => {});

  it('should render RelatedContent component without <ul> and <li> when given single item in collection', () => {});
});
