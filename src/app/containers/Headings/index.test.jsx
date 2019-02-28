import React from 'react';
import { render } from 'enzyme';
import HeadingsContainer from './index';
import { textBlock } from '../../models/blocks';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';

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
    shouldShallowMatchSnapshot(
      'should render correctly',
      <HeadingsContainer {...data} />,
    );
  });
};

describe('Headings', () => {
  describe('with no data', () => {
    isNull('should not render anything', <HeadingsContainer />);
  });

  template('with headline data', 'This is a headline!', 'headline');
  template('with subheadline data', 'This is a subheadline', 'subheadline');

  describe('with plain text', () => {
    it('should render headline', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('Plain headline', [])}
          type="headline"
        />,
      );
      expect(renderedWrapper.html()).toBe('Plain headline');
    });
    it('should render subheading', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('Plain subheading', [])}
          type="subheadline"
        />,
      );
      expect(renderedWrapper.html()).toBe('Plain subheading');
    });
  });

  describe('with rich text', () => {
    it('should render headline with italic text', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('All is italic', ['italic'])}
          type="headline"
        />,
      );
      expect(renderedWrapper.html()).toBe('<i>All is italic</i>');
    });

    it('should render headline with bold text', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('All is bold', ['bold'])}
          type="headline"
        />,
      );
      expect(renderedWrapper.html()).toBe('<b>All is bold</b>');
    });

    it('should render headline with bold & italic text', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('All is bold and italic', [
            'bold',
            'italic',
          ])}
          type="headline"
        />,
      );
      expect(renderedWrapper.html()).toBe(
        '<i><b>All is bold and italic</b></i>',
      );
    });

    it('should render headline with italic & bold text', () => {
      const renderedWrapper = render(
        <HeadingsContainer
          blocks={blocksSingleFragment('All is italic and bold', [
            'italic',
            'bold',
          ])}
          type="headline"
        />,
      );
      expect(renderedWrapper.html()).toBe(
        '<b><i>All is italic and bold</i></b>',
      );
    });

    describe('with different attributes', () => {
      it('should render headline with only middle of text italic', () => {
        const renderedWrapper = render(
          <HeadingsContainer
            blocks={textItalicFragmentPart('This is ', 'very', ' important')}
            type="headline"
          />,
        );
        expect(renderedWrapper.html()).toBe('This is <i>very</i> important');
      });
    });
  });
});
