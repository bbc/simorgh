import '@testing-library/jest-dom/extend-expect';
import renderApp from '../renderApp';

export const shouldHaveFooterCopyrightText = ({ text, pathname }) => {
  it('should have footer copyright text', async () => {
    const app = await renderApp(pathname);
    const footerEl = document.querySelector('footer');
    const copyrightEl = app.within(footerEl).getByTextSpecial(text);

    expect(copyrightEl).toBeInTheDocument();
  });
};

export const shouldHaveFooterBranding = ({ text, link, pathname }) => {
  it('should have BBC branding', async () => {
    const app = await renderApp(pathname);
    const footerEl = document.querySelector('footer');
    const brandingEl = app.within(footerEl).getByTextSpecial(text);
    const brandingLinkEl = brandingEl.parentNode;
    const brandingImageEl = brandingLinkEl.querySelector('svg');

    expect(brandingEl).toBeInTheDocument();
    expect(brandingLinkEl.tagName).toEqual('A');
    expect(brandingLinkEl.getAttribute('href')).toEqual(link);
    expect(brandingImageEl).toBeInTheDocument();
  });
};
