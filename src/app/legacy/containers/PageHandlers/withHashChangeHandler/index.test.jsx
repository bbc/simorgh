import React from 'react';
import { render } from '@testing-library/react';

import withHashChangeHandler from '.';

const Fixture = withHashChangeHandler(() => (
  <>
    <a href="#section-1">Go to section 1</a>
    <section id="section-1">Section 1</section>
  </>
));

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.focus = jest.fn();

it('should scroll into view and focus on element when hash location changes', async () => {
  const { rerender } = render(<Fixture location={{ hash: '' }} />);

  rerender(<Fixture location={{ hash: '#section-1' }} />);

  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(window.HTMLElement.prototype.focus).toHaveBeenCalledTimes(1);
});
