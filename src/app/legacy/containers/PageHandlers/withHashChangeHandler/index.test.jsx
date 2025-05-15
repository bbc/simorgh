import React from 'react';
import { render } from '@testing-library/react';

import withHashChangeHandler from '.';

const Fixture = withHashChangeHandler(() => (
  <>
    <a href="#section-1">Go to section 1</a>
    <h2 id="section-1">Section 1</h2>
  </>
));

const CyrillicFixture = withHashChangeHandler(() => (
  <>
    <a href="#Мирнија-сам-неко-брине-о-њој-док-је-у-школи">Go to section 1</a>
    <h2 id="Мирнија-сам-неко-брине-о-њој-док-је-у-школи">Section 1</h2>
  </>
));

const HindiFixture = withHashChangeHandler(() => (
  <>
    <a href="#आंखों-के-सामने-छा-गया-था-अंधेरा">Go to section 1</a>
    <h2 id="आंखों-के-सामने-छा-गया-था-अंधेरा">Section 1</h2>
  </>
));

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.focus = jest.fn();

describe('withHashChangeHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should scroll into view and focus on element when hash location changes', async () => {
    const { rerender } = render(<Fixture location={{ hash: '' }} />);

    rerender(<Fixture location={{ hash: '#section-1' }} />);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(
      1,
    );
    expect(window.HTMLElement.prototype.focus).toHaveBeenCalledTimes(1);
  });

  it('should scroll into view and focus on element when hash location contains Cyrillic characters', async () => {
    render(
      <CyrillicFixture
        location={{
          hash:
            // This is the encoded version of Мирнија-сам-неко-брине-о-њој-док-је-у-школи
            '#%D0%9C%D0%B8%D1%80%D0%BD%D0%B8%D1%98%D0%B0-%D1%81%D0%B0%D0%BC-%D0%BD%D0%B5%D0%BA%D0%BE-%D0%B1%D1%80%D0%B8%D0%BD%D0%B5-%D0%BE-%D1%9A%D0%BE%D1%98-%D0%B4%D0%BE%D0%BA-%D1%98%D0%B5-%D1%83-%D1%88%D0%BA%D0%BE%D0%BB%D0%B8',
        }}
      />,
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(
      1,
    );
    expect(window.HTMLElement.prototype.focus).toHaveBeenCalledTimes(1);
  });

  it('should scroll into view and focus on element when hash location contains Hindi characters', async () => {
    render(
      <HindiFixture
        location={{
          hash:
            // This is the encoded version of आंखों-के-सामने-छा-गया-था-अंधेरा
            '#%E0%A4%86%E0%A4%82%E0%A4%96%E0%A5%8B%E0%A4%82-%E0%A4%95%E0%A5%87-%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%A8%E0%A5%87-%E0%A4%9B%E0%A4%BE-%E0%A4%97%E0%A4%AF%E0%A4%BE-%E0%A4%A5%E0%A4%BE-%E0%A4%85%E0%A4%82%E0%A4%A7%E0%A5%87%E0%A4%B0%E0%A4%BE',
        }}
      />,
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(
      1,
    );
    expect(window.HTMLElement.prototype.focus).toHaveBeenCalledTimes(1);
  });
});
