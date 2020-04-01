import React from 'react';
import { render } from 'enzyme';
import { latin } from '@bbc/gel-foundations/scripts';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import HeadingsContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { textBlock } from '#models/blocks';
import blocksSingleFragment from './testHelpers';

const HeadingsContainerWithContext = (data) => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <HeadingsContainer {...data} />
  </ServiceContext.Provider>
);

const getId = (enzymeWrapper) => enzymeWrapper[0].children[0].attribs.id;

const textItalicFragmentPart = (text1, text2Italic, text3) => [
  {
    id: '12398083',
    type: 'text',
    model: {
      blocks: [
        {
          id: '98239082',
          type: 'paragraph',
          model: {
            text: text1 + text2Italic + text3,
            blocks: [
              {
                id: '23048106',
                type: 'fragment',
                model: {
                  text: text1,
                  attributes: [],
                },
              },
              {
                id: '82892194',
                type: 'fragment',
                model: {
                  text: text2Italic,
                  attributes: ['italic'],
                },
              },
              {
                id: '34219424',
                type: 'fragment',
                model: {
                  text: text3,
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

const template = (title, text, type) => {
  describe(title, () => {
    const data = {
      ...textBlock(text, 'mock-id'),
      type,
    };
    shouldMatchSnapshot(
      'should render correctly',
      HeadingsContainerWithContext(data),
    );
  });
};

describe('Headings', () => {
  describe('with no data', () => {
    suppressPropWarnings(['type', 'undefined']);
    suppressPropWarnings(['blocks', 'supplied']);
    isNull('should not render anything', HeadingsContainerWithContext());
  });

  template('with headline data', 'This is a headline!', 'headline');
  template('with subheadline data', 'This is a subheadline', 'subheadline');

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 containing correct text',
        HeadingsContainerWithContext(data),
      );

      it('should have an id for the skiplink with value "content"', () => {
        const headlineHeading = render(HeadingsContainerWithContext(data));
        expect(getId(headlineHeading)).toBe('content');
      });
    });

    describe('subheadline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain subheadline', []),
        type: 'subheadline',
      };

      shouldMatchSnapshot(
        'should render h2 containing correct text',
        HeadingsContainerWithContext(data),
      );

      it('should have an id of sanitised text', () => {
        const subheadlineHeading = render(HeadingsContainerWithContext(data));
        expect(getId(subheadlineHeading)).toBe('Plain-subheadline');
      });
    });
  });

  describe('with rich text', () => {
    describe('headline with italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic', ['italic']),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 with <i> tag',
        HeadingsContainerWithContext(data),
      );
    });

    describe('headline with bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold', ['bold']),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 with <b> tag',
        HeadingsContainerWithContext(data),
      );
    });

    describe('should render headline with bold & italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold and italic', [
          'bold',
          'italic',
        ]),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 with <i><b> tags',
        HeadingsContainerWithContext(data),
      );
    });

    describe('should render headline with italic & bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic and bold', [
          'italic',
          'bold',
        ]),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 with <b><i> tags',
        HeadingsContainerWithContext(data),
      );
    });

    describe('with different attributes', () => {
      describe('should render headline with only middle of text italic', () => {
        const data = {
          blocks: textItalicFragmentPart('This is ', 'very', ' important'),
          type: 'headline',
        };

        shouldMatchSnapshot(
          'should render correctly',
          HeadingsContainerWithContext(data),
        );
      });
    });
  });
});
