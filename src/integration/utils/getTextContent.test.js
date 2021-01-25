import getTextContent from './getTextContent';

const createDiv = innerContent =>
  new DOMParser()
    .parseFromString(`<div>${innerContent}</div>`, 'text/html')
    .querySelector('div');

it('should handle a basic element', () => {
  const el = createDiv('foo');

  expect(getTextContent(el)).toEqual('foo');
});

it('should handle a nested element', () => {
  const el = createDiv('<span>foo</span>');

  expect(getTextContent(el)).toEqual('foo');
});

it('should handle an element with a nested style element', () => {
  const el = createDiv(`
    foo
    <style>.class { display: inline }</style>
    baz
  `);

  expect(getTextContent(el)).toEqual('foo baz');
});

it('should handle an element with multiple nested style elements', () => {
  const el = createDiv(`
    foo
    <style>.class { display: inline }</style>
    baz
    <style>div { display: inline }</style>
    <style>#id { display: inline }</style>
    <span>bar</span>
  `);

  expect(getTextContent(el)).toEqual('foo baz bar');
});

it('should handle a node with attributes', () => {
  const el = createDiv(
    '<span data-emotion-css=".class { display: inline }">foo</span>',
  );

  expect(getTextContent(el)).toEqual('foo');
});

it('should handle a node with media queries', () => {
  const el = createDiv(`
    foo
    <style>
      .class { display: inline; }
      @media (max-width: 20px) {
        .class { display: block }
      }
    </style>
    baz
    <span>bar</span>
  `);

  expect(getTextContent(el)).toEqual('foo baz bar');
});
