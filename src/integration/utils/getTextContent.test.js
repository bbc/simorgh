import getTextContent from './getTextContent';

it('should handle a basic node', () => {
  const doc = new DOMParser().parseFromString('<div>foo</div>', 'text/html');
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo');
});

it('should handle a nested node', () => {
  const doc = new DOMParser().parseFromString(
    '<div><span>foo</span></div>',
    'text/html',
  );
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo');
});

it('should handle a node with a style tag', () => {
  const doc = new DOMParser().parseFromString(
    '<div>foo <style>.class { display: inline }</style>baz</div>',
    'text/html',
  );
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo baz');
});

it('should handle a node with nested text tags', () => {
  const doc = new DOMParser().parseFromString(
    '<div>foo <style>.class { display: inline }</style>baz <span>bar</span></div>',
    'text/html',
  );
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo baz bar');
});

it('should handle a node with nested styles tags', () => {
  const doc = new DOMParser().parseFromString(
    '<div>foo <style>.class { display: inline; }</style>baz <span>bar</span></div>',
    'text/html',
  );
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo baz bar');
});

it('should handle a node with media queries', () => {
  const doc = new DOMParser().parseFromString(
    '<div>foo <style>.class { display: inline; }@media (max-width: 20px) { .class { display: block }}</style>baz <span>bar</span></div>',
    'text/html',
  );
  const el = doc.querySelector('div');

  expect(getTextContent(el)).toEqual('foo baz bar');
});
