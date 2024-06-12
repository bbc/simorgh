import React, { useMemo } from 'react';
import { textBlock } from '#models/blocks';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../contexts/ServiceContext';
import HeadingsContainer from '.';
import blocksSingleFragment from './testHelpers';

const HeadingsContainerWithContext = ({ data }) => {
  const memoizedServiceContextValue = useMemo(
    () => ({ script: latin, service: 'news' }),
    [],
  );
  return (
    <ServiceContext.Provider value={memoizedServiceContextValue}>
      <HeadingsContainer {...data} />
    </ServiceContext.Provider>
  );
};

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
    it('should render correctly', () => {
      const { container } = render(
        <HeadingsContainerWithContext data={data} />,
      );
      expect(container).toMatchSnapshot();
    });
  });
};

describe('Headings', () => {
  describe('with no data', () => {
    suppressPropWarnings(['type', 'undefined']);
    suppressPropWarnings(['blocks', 'supplied']);
    isNull('should not render anything', <HeadingsContainerWithContext />);
  });

  template('with headline data', 'This is a headline!', 'headline');
  template('with subheadline data', 'This is a subheadline', 'subheadline');

  describe('with plain text', () => {
    describe('headline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain headline', []),
        type: 'headline',
      };

      it('should render h1 containing correct text', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });

      it('should have an id for the skiplink with value "content"', () => {
        const { getByText } = render(
          <HeadingsContainerWithContext data={data} />,
        );

        expect(getByText('Plain headline').getAttribute('id')).toBe('content');
      });
    });

    describe('subheadline', () => {
      const data = {
        blocks: blocksSingleFragment('Plain subheadline', []),
        type: 'subheadline',
      };

      it('should render h2 containing correct text', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });

      it('should have an id of sanitised text', () => {
        const { getByText } = render(
          <HeadingsContainerWithContext data={data} />,
        );

        expect(getByText('Plain subheadline').getAttribute('id')).toBe(
          'Plain-subheadline',
        );
      });
    });
  });

  describe('with rich text', () => {
    describe('headline with italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic', ['italic']),
        type: 'headline',
      };

      it('should render h1 with <i> tag', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('headline with bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold', ['bold']),
        type: 'headline',
      };

      it('should render h1 with <b> tag', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('should render headline with bold & italic text', () => {
      const data = {
        blocks: blocksSingleFragment('All is bold and italic', [
          'bold',
          'italic',
        ]),
        type: 'headline',
      };

      it('should render h1 with <b><i> tags', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('should render headline with italic & bold text', () => {
      const data = {
        blocks: blocksSingleFragment('All is italic and bold', [
          'italic',
          'bold',
        ]),
        type: 'headline',
      };

      it('should render h1 with <b><i> tags', () => {
        const { container } = render(
          <HeadingsContainerWithContext data={data} />,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('with different attributes', () => {
      describe('should render headline with only middle of text italic', () => {
        const data = {
          blocks: textItalicFragmentPart('This is ', 'very', ' important'),
          type: 'headline',
        };

        it('should render correctly', () => {
          const { container } = render(
            <HeadingsContainerWithContext data={data} />,
          );
          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  describe('in the middle of articles', () => {
    const data = {
      blocks: blocksSingleFragment('Sample headline', [], 2),
      type: 'headline',
    };

    it('should render correctly', () => {
      const { container } = render(
        <HeadingsContainerWithContext data={data} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should use <strong> element', () => {
      const { getByText } = render(
        <HeadingsContainerWithContext data={data} />,
      );
      expect(getByText('Sample headline').nodeName).toBe('STRONG');
    });

    it('should not have a tab index', () => {
      const { getByText } = render(
        <HeadingsContainerWithContext data={data} />,
      );
      expect(getByText('Sample headline')).not.toHaveAttribute('tabindex');
    });

    it('should not have an id', () => {
      const { getByText } = render(
        <HeadingsContainerWithContext data={data} />,
      );
      expect(getByText('Sample headline')).not.toHaveAttribute('id');
    });
  });
});
