const getMetaTagContent = (selector) =>
  document.querySelector(selector).getAttribute('content');

export default () => {
  it('Page title', () => {
    const pageTitleEl = document.querySelector('title');

    expect(pageTitleEl).toBeInTheDocument();
    expect(pageTitleEl.textContent).toBeTruthy();
    expect(pageTitleEl.textContent).toMatchSnapshot();
  });

  it('Heading level 1', () => {
    const headingEl = document.querySelector('h1');

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toBeTruthy();
    expect(headingEl.textContent).toMatchSnapshot();
  });

  it('Canonical link', () => {
    const canonicalEl = document.querySelector('head link[rel="canonical"]');

    expect(canonicalEl.getAttribute('href')).toMatchSnapshot();
  });

  it('Robots meta tag', () => {
    const robotsEl = document.querySelector('head meta[name="robots"]');
    const robotsContent = robotsEl.getAttribute('content');

    expect(robotsContent).toMatchSnapshot();
  });

  it('Lang attribute', () => {
    const htmlEl = document.querySelector('html');

    expect(htmlEl.getAttribute('lang')).toMatchSnapshot();
  });

  it('Dir attribute', () => {
    const htmlEl = document.querySelector('html');

    expect(htmlEl.getAttribute('dir')).toMatchSnapshot();
  });

  it('FB admins', () => {
    const metaTagContent = getMetaTagContent('meta[property="fb:admins"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('FB app ID', () => {
    const metaTagContent = getMetaTagContent('meta[property="fb:app_id"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG image', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:image"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG image alt', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:image:alt"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG locale', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:locale"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG type', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:type"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG url', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:url"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG site name', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:site_name"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter card', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:card"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter creator', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:creator"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter image alt', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:image:alt"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter image src', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:image:src"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter site', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:site"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG description', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:description"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('OG title', () => {
    const metaTagContent = getMetaTagContent('meta[property="og:title"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter description', () => {
    const metaTagContent = getMetaTagContent(
      'meta[name="twitter:description"]',
    );

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });

  it('Twitter title', () => {
    const metaTagContent = getMetaTagContent('meta[name="twitter:title"]');

    expect(metaTagContent).toBeTruthy();
    expect(metaTagContent).toMatchSnapshot();
  });
};
