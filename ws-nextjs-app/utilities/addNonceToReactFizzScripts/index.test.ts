import addNonceToReactFizzScripts from '.';

describe('addNonceToReactFizzScripts', () => {
  const nonce = 'test-nonce';

  it.each([
    '<script>$RC("content")</script>',
    '<script>$RV("content")</script>',
    '<script>requestAnimationFrame(function(){$RT(0)})</script>',
  ])('adds a nonce to React Fizz scripts: %s', script => {
    expect(addNonceToReactFizzScripts(script, nonce)).toBe(
      script.replace('<script>', `<script nonce="${nonce}">`),
    );
  });

  it('preserves existing script attributes', () => {
    const script = '<script data-testid="fizz">$RC("content")</script>';

    expect(addNonceToReactFizzScripts(script, nonce)).toBe(
      '<script nonce="test-nonce" data-testid="fizz">$RC("content")</script>',
    );
  });

  it('does not replace an existing nonce', () => {
    const script = '<script nonce="existing-nonce">$RC("content")</script>';

    expect(addNonceToReactFizzScripts(script, nonce)).toBe(script);
  });

  it('does not add a nonce to non-Fizz scripts, including external scripts', () => {
    const html =
      '<script>console.log("content")</script><script src="/app.js"></script>';

    expect(addNonceToReactFizzScripts(html, nonce)).toBe(html);
  });

  it('returns the HTML unchanged when no nonce is provided', () => {
    const html = '<script>$RC("content")</script>';

    expect(addNonceToReactFizzScripts(html, undefined)).toBe(html);
  });
});
