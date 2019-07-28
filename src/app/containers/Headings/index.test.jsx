import React from 'react';
import { render } from 'enzyme';
import { latin } from '@bbc/gel-foundations/scripts';
import HeadingsContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../../testHelpers';
import blocksSingleFragment from './testHelpers';

const HeadingsContainerWithContext = data => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <HeadingsContainer {...data} />
  </ServiceContext.Provider>
);

const getId = enzymeWrapper => enzymeWrapper[0].children[0].attribs.id;

const textItalicFragmentPart = (text1, text2Italic, text3) => [
  {
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: text1 + text2Italic + text3,
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: text1,
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: text2Italic,
                  attributes: ['italic'],
                },
              },
              {
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
      ...textBlock(text),
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
    isNull('should not render anything', HeadingsContainerWithContext);
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

      it('should not have an id', () => {
        const headlineHeading = render(<HeadingsContainer {...data} />);
        expect(getId(headlineHeading)).toBe(undefined);
      });
    });

    describe('subheadline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain subheadline', []),
        type: 'subheadline',
      };

      shouldMatchSnapshot(
        'should render h2 containing correct text',
        <HeadingsContainer {...data} />,
      );

      it('should have an id of sanitised text', () => {
        const subheadlineHeading = render(<HeadingsContainer {...data} />);
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
        <HeadingsContainer {...data} />,
      );
    });

    describe('headline with bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold', ['bold']),
        type: 'headline',
      };

      shouldMatchSnapshot(
        'should render h1 with <b> tag',
        <HeadingsContainer {...data} />,
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
        <HeadingsContainer {...data} />,
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
        <HeadingsContainer {...data} />,
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
          <HeadingsContainer {...data} />,
        );
      });
    });
  });
});
