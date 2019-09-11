/*
 * Similar to this problem https://github.com/testing-library/react-testing-library/issues/402
 * This helper was created to solve the problem of rendering helmet/head contents in snapshots.
 * Pass in a component that uses helmet somewhere in the component tree.
 * The full html tree is rendered and returned which you can then use to snapshot helmet/head contents.
 * Example of use in a test file:

 it('should render correctly', async () => {
    const html = await renderHelmet(<SomeComponent {...someProps} />);
    expect(html).toMatchSnapshot();
  });

 */

import { render, waitForDomChange } from '@testing-library/react';

const noop = () => {};

export default async component => {
  render(component);

  return waitForDomChange(document.querySelector('html'))
    .catch(noop) // handle a waitForDomChange timeout
    .then(() => {
      const htmlElement = document.querySelector('html');

      const helmetElements = document.querySelectorAll(
        '[data-react-helmet="true"]',
      );

      const removeHelmetAttributes = el =>
        el.removeAttribute('data-react-helmet'); // remove react-helmet attribute noise from elements

      removeHelmetAttributes(htmlElement); // remove react-helmet attribute noise from elements

      Array.from(helmetElements).forEach(removeHelmetAttributes);

      return document.querySelector('html');
    });
};
