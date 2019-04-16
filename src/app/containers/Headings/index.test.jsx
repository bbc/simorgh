import React from 'react';
import { render } from 'enzyme';
import { latin } from '@bbc/gel-foundations/scripts';
import HeadingsContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

const HeadingsContainerWithContext = data => (
  <ServiceContext.Provider value={{ script: latin }}>
    <HeadingsContainer {...data} />
  </ServiceContext.Provider>
);

const blocksSingleFragment = (text, attributes = []) => [
  {
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text,
            blocks: [
              {
                type: 'fragment',
                model: {
                  text,
                  attributes,
                },
              },
            ],
          },
        },
      ],
    },
  },
];

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
    it('should render headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
        type: 'headline',
      };
      const renderedWrapper = render(HeadingsContainerWithContext(data));

      expect(renderedWrapper.find('h1').html()).toBe('Plain headline');
    });

    it('should render subheadline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain subheadline', []),
        type: 'subheadline',
      };
      const renderedWrapper = render(HeadingsContainer(data));

      expect(renderedWrapper.find('h2').html()).toBe('Plain subheadline');
    });
  });

  describe('with rich text', () => {
    it('should render headline with italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic', ['italic']),
        type: 'headline',
      };
      const renderedWrapper = render(HeadingsContainer(data));

      expect(renderedWrapper.find('h1').html()).toBe('<i>All is italic</i>');
    });

    it('should render headline with bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold', ['bold']),
        type: 'headline',
      };
      const renderedWrapper = render(HeadingsContainer(data));

      expect(renderedWrapper.find('h1').html()).toBe('<b>All is bold</b>');
    });

    it('should render headline with bold & italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold and italic', [
          'bold',
          'italic',
        ]),
        type: 'headline',
      };
      const renderedWrapper = render(HeadingsContainer(data));

      expect(renderedWrapper.find('h1').html()).toBe(
        '<i><b>All is bold and italic</b></i>',
      );
    });

    it('should render headline with italic & bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic and bold', [
          'italic',
          'bold',
        ]),
        type: 'headline',
      };
      const renderedWrapper = render(HeadingsContainer(data));

      expect(renderedWrapper.find('h1').html()).toBe(
        '<b><i>All is italic and bold</i></b>',
      );
    });

    describe('with different attributes', () => {
      it('should render headline with only middle of text italic', () => {
        const data = {
          blocks: textItalicFragmentPart('This is ', 'very', ' important'),
          type: 'headline',
        };
        const renderedWrapper = render(HeadingsContainer(data));

        expect(renderedWrapper.find('h1').html()).toBe(
          'This is <i>very</i> important',
        );
      });
    });
  });
});
