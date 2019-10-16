import { render, waitForDomChange } from '@testing-library/react';

const renderWithHelmet = component => {
  /*
   * Similar to this problem https://github.com/testing-library/react-testing-library/issues/402
   * This helper was created to solve the problem of rendering helmet/head contents in snapshots.
   * Pass in a component that uses helmet somewhere in the component tree.
   * The full html tree is returned which you can then use to snapshot helmet/head contents.
   */

  const { container } = render(component);
  const noop = () => {};
  const ARBITRARY_TIMEOUT = 100; // seems long enough for any dom mutations to occur
  const headElement = document.querySelector('head');

  headElement.innerHTML = ''; // clear out head mutations from previous tests

  return waitForDomChange({
    container: headElement,
    timeout: ARBITRARY_TIMEOUT,
  })
    .catch(noop) // handle a waitForDomChange timeout
    .then(mutationsList => {
      const headMutationDetected = mutationsList && mutationsList.length;

      if (headMutationDetected) {
        // helmet was probably used so we should get the full html

        const htmlElement = document.querySelector('html');

        const helmetElements = document.querySelectorAll(
          '[data-react-helmet="true"]',
        );

        const removeHelmetAttributes = el =>
          el.removeAttribute('data-react-helmet'); // remove react-helmet attribute noise from elements

        removeHelmetAttributes(htmlElement); // remove react-helmet attribute noise from elements

        Array.from(helmetElements).forEach(removeHelmetAttributes);

        return { container: document.querySelector('html') };
      }

      return { container };
    });
};

export default (component, done) => {
  const removeWrappingDiv = container => container.firstChild;
  renderWithHelmet(component).then(({ container }) => {
    const hasOneChild = container.children.length === 1;
    /*
     * if the container has more than one child then it's a component that uses a
     * fragment at the top level so we should not select the first child because it
     * wouldn't snapshot the whole component
     */
    expect(
      hasOneChild ? removeWrappingDiv(container) : container,
    ).toMatchSnapshot();

    done();
  });
};
