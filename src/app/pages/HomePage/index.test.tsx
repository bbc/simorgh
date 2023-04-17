import React from 'react';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { Helmet } from 'react-helmet';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('should render a section for each curation', () => {
    const { container } = render(<HomePage pageData={kyrgyzHomePageData} />, {
      service: 'kyrgyz',
    });
    expect(container).not.toBeEmptyDOMElement();
    expect(container.getElementsByTagName('section').length).toEqual(
      kyrgyzHomePageData.curations.length,
    );
  });

  it('should apply provided margin size to the main element', () => {
    const { getByRole } = render(<HomePage pageData={kyrgyzHomePageData} />, {
      service: 'kyrgyz',
    });
    expect(getByRole('main')).toHaveStyle({
      margin: '0px 0.5rem',
    });
  });

  it('should have visually hidden text with the localised product, service - home as the H1', () => {
    const { container } = render(<HomePage pageData={kyrgyzHomePageData} />, {
      service: 'kyrgyz',
    });

    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();

    const content = h1?.getAttribute('id');
    const tabIndex = h1?.getAttribute('tabIndex');

    expect(content).toEqual('content');
    expect(tabIndex).toBe('-1');

    const span = h1?.querySelector('span');
    expect(span?.getAttribute('role')).toEqual('text');
    expect(span?.textContent).toEqual(
      'BBC News, Кыргыз КызMATы - Башталгыч бет',
    );

    const langSpan = span?.querySelector('span');
    expect(langSpan?.getAttribute('lang')).toEqual('en-GB');
    expect(langSpan?.textContent).toEqual('BBC News');
  });

  it('should have a metadata title', () => {
    render(<HomePage pageData={kyrgyzHomePageData} />, {
      service: 'kyrgyz',
    });
    expect(Helmet.peek().title).toEqual(
      'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео - BBC News Кыргыз Кызматы',
    );
  });

  it('should have a metadata description', () => {
    render(<HomePage pageData={kyrgyzHomePageData} />, {
      service: 'kyrgyz',
    });
    const helmetContent = Helmet.peek();
    const findDescription = helmetContent.metaTags.find(
      ({ name }) => name === 'description',
    );
    expect(findDescription?.content).toEqual(kyrgyzHomePageData.description);
  });
});
