import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import FragmentContainer from './index';

describe('Fragment', () => {
  describe('with no attributes', () => {
    it('should render just text', () => {
      const { container } = render(
        <FragmentContainer text="This is some text with no attributes" />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('with bold attributes', () => {
    it('should render text wrapped in a bold DOM element', () => {
      const { container } = render(
        <FragmentContainer
          text="This is some text with bold attributes"
          attributes={['bold']}
        />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('with italic attributes', () => {
    it('should render text wrapped in an italic DOM element', () => {
      const { container } = render(
        <FragmentContainer
          text="This is some text with italic attributes"
          attributes={['italic']}
        />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('with bold and italic attributes', () => {
    it('should render text wrapped in bold and italic DOM elements', () => {
      const { container } = render(
        <FragmentContainer
          text="This is some text with bold and italic attributes"
          attributes={['bold', 'italic']}
        />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('with an unknown attribute', () => {
    it('should ignore the attribute', () => {
      const { container } = render(
        <FragmentContainer
          text="This is some text with a bold and unknown attribute"
          attributes={['bold', 'unknown']}
        />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('with italic attributes in Farsi', () => {
    it('should render text wrapped in an italic DOM element', () => {
      const { container } = render(
        <FragmentContainer
          text="This is some text with italic attributes"
          attributes={['italic']}
        />,
        { service: 'persian' },
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('should emit an empty div when provided with no content', () => {
    render(<FragmentContainer />);
    expect(document.querySelector('div')).toBeInTheDocument();
    expect(document.querySelector('div').textContent.trim()).toBe('');
  });
});
