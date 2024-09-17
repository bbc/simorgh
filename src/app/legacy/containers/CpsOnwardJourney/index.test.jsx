import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { GHOST, EBON } from '#components/ThemeProvider/palette';
import CpsOnwardJourney from '.';
import '@testing-library/jest-dom';

describe('CpsOnwardJourney', () => {
  const buildStoryItems = count => {
    const items = Array.from(new Array(count)).map((_, i) => ({
      headlines: {
        headline: `Foo in the news ${i}`,
      },
      locators: {
        assetUri: `/mundo/foo${i}`,
      },
    }));

    return items;
  };

  const promoListComponent = item => {
    const { promoItems, dir } = item;
    return (
      <ul>
        {promoItems.map(
          ({ headlines: { headline }, locators: { assetUri } }) => (
            <li key={headline.split(' ').join('-')} dir={dir}>
              <a href={assetUri}>{headline}</a>
            </li>
          ),
        )}
      </ul>
    );
  };

  const promoComponent = item => {
    const { promo, dir } = item;
    const {
      headlines: { headline },
      locators: { assetUri },
    } = promo;
    return (
      <div dir={dir}>
        <a href={assetUri}>{headline}</a>
      </div>
    );
  };

  it('Renders nothing with no content', () => {
    const { container } = render(
      <ServiceContextProvider service="mundo">
        <CpsOnwardJourney
          labelId="heading-label"
          promoListComponent={promoListComponent}
          promoComponent={promoComponent}
          columnType="main"
        />
      </ServiceContextProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('Creates single promo with minimal props', () => {
    const { getByText, container } = render(
      <ServiceContextProvider service="mundo">
        <CpsOnwardJourney
          labelId="heading-label"
          promoListComponent={promoListComponent}
          promoComponent={promoComponent}
          columnType="main"
          content={buildStoryItems(1)}
        />
      </ServiceContextProvider>,
    );

    expect(container).toMatchSnapshot();

    const promo = getByText('Foo in the news 0');
    expect(promo.tagName).toBe('A');
    expect(promo).toHaveAttribute('href', '/mundo/foo0');

    const div = promo.parentNode;
    expect(div.tagName).toBe('DIV');
    expect(div).toHaveAttribute('dir', 'ltr');
  });

  it('Creates multiple promos with minimal props', () => {
    const { getByText, container } = render(
      <ServiceContextProvider service="mundo">
        <CpsOnwardJourney
          labelId="heading-label"
          promoListComponent={promoListComponent}
          promoComponent={promoComponent}
          columnType="main"
          content={buildStoryItems(3)}
        />
      </ServiceContextProvider>,
    );

    expect(container).toMatchSnapshot();

    for (let i = 0; i < 3; i += 1) {
      const promo = getByText(`Foo in the news ${i}`);
      expect(promo.tagName).toBe('A');
      expect(promo).toHaveAttribute('href', `/mundo/foo${i}`);

      const div = promo.parentNode;
      expect(div.tagName).toBe('LI');
      expect(div).toHaveAttribute('dir', 'ltr');
    }
  });

  it.each`
    expectation          | promoCount
    ${'single promo'}    | ${1}
    ${'multiple promos'} | ${3}
  `('renders section label with $expectation', ({ promoCount }) => {
    const { getByText } = render(
      <ServiceContextProvider service="mundo">
        <CpsOnwardJourney
          labelId="heading-label"
          promoListComponent={promoListComponent}
          promoComponent={promoComponent}
          columnType="main"
          content={buildStoryItems(promoCount)}
          title="The Foo Section"
        />
      </ServiceContextProvider>,
    );

    const sectionLabel = getByText('The Foo Section');
    expect(sectionLabel).toBeInTheDocument();
  });

  it.each`
    expectation                             | sectionLabelOverrideAs | sectionLabelBar | sectionLabelBackground
    ${'element as strong'}                  | ${'strong'}            | ${true}         | ${GHOST}
    ${'without bar under section label'}    | ${null}                | ${false}        | ${GHOST}
    ${'with alternative background colour'} | ${null}                | ${true}         | ${EBON}
  `(
    'renders section label with $expectation',
    ({ sectionLabelOverrideAs, sectionLabelBar, sectionLabelBackground }) => {
      const { container } = render(
        <ServiceContextProvider service="mundo">
          <CpsOnwardJourney
            labelId="heading-label"
            promoListComponent={promoListComponent}
            promoComponent={promoComponent}
            columnType="main"
            content={buildStoryItems(1)}
            title="The Foo Section"
            sectionLabelOverrideAs={sectionLabelOverrideAs}
            sectionLabelBar={sectionLabelBar}
            sectionLabelBackground={sectionLabelBackground}
          />
        </ServiceContextProvider>,
      );

      expect(container).toMatchSnapshot();
    },
  );

  it.each`
    expectation          | promoCount
    ${'single promo'}    | ${1}
    ${'multiple promos'} | ${3}
  `('renders skip link with $expectation', ({ promoCount }) => {
    const { getByText, container } = render(
      <ServiceContextProvider service="mundo">
        <CpsOnwardJourney
          labelId="heading-label"
          promoListComponent={promoListComponent}
          promoComponent={promoComponent}
          columnType="main"
          content={buildStoryItems(promoCount)}
          title="The Foo Section"
          skipLink={{
            terms: {
              '%title%': 'The Foo Section',
            },
            endTextId: 'end-of-the-foo-section',
            text: 'skip the foo section',
            endTextVisuallyHidden: 'end of the foo section',
          }}
        />
      </ServiceContextProvider>,
    );

    expect(container).toMatchSnapshot();

    const skipLink = getByText('skip the foo section');
    expect(skipLink).toBeInTheDocument();
    const endOfSection = getByText('end of the foo section');
    expect(endOfSection).toBeInTheDocument();
  });
});
