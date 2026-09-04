import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import FragmentContainer from './index';

describe('Fragment', () => {
  describe('with no attributes', () => {
    it('should render just text', () => {
      render(<FragmentContainer text="This is some text with no attributes" />);

      expect(
        screen.getByText('This is some text with no attributes'),
      ).toBeInTheDocument();
    });
  });

  describe('with bold attributes', () => {
    it('should render text wrapped in a bold DOM element', () => {
      render(
        <FragmentContainer
          text="This is some text with bold attributes"
          attributes={['bold']}
        />,
      );

      expect(
        screen.getByText('This is some text with bold attributes').tagName,
      ).toBe('B');
    });
  });

  describe('with italic attributes', () => {
    it('should render text wrapped in an italic DOM element', () => {
      render(
        <FragmentContainer
          text="This is some text with italic attributes"
          attributes={['italic']}
        />,
      );

      expect(
        screen.getByText('This is some text with italic attributes').tagName,
      ).toBe('I');
    });
  });

  describe('with bold and italic attributes', () => {
    it('should render text wrapped in bold and italic DOM elements', () => {
      render(
        <FragmentContainer
          text="This is some text with bold and italic attributes"
          attributes={['bold', 'italic']}
        />,
      );

      const text = screen.getByText(
        'This is some text with bold and italic attributes',
      );
      expect(text.closest('b')).toBeInTheDocument();
      expect(text.closest('i')).toBeInTheDocument();
    });
  });

  describe('with an unknown attribute', () => {
    it('should ignore the attribute', () => {
      render(
        <FragmentContainer
          text="This is some text with a bold and unknown attribute"
          attributes={['bold', 'unknown']}
        />,
      );

      expect(
        screen.getByText('This is some text with a bold and unknown attribute')
          .tagName,
      ).toBe('B');
    });
  });

  describe('with italic attributes in Farsi', () => {
    it('should render text wrapped in an italic DOM element', () => {
      render(
        <FragmentContainer
          text="This is some text with italic attributes"
          attributes={['italic']}
        />,
        { service: 'persian' },
      );

      expect(
        screen.getByText('This is some text with italic attributes').tagName,
      ).toBe('I');
    });
  });

  describe('should emit an empty div when provided with no content', () => {
    render(<FragmentContainer />);
    expect(document.querySelector('div')).toBeInTheDocument();
    expect(document.querySelector('div').textContent.trim()).toBe('');
  });
});
