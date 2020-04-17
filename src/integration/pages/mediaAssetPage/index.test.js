it('Headline', () => {
  const h1El = document.querySelector('h1[id="content"]');

  expect(h1El).toBeInTheDocument();
  expect(h1El).toBeTruthy();
  expect(h1El.textContent).toMatchInlineSnapshot();
});

it('Timestamp', () => {
  const timestampEl = document.querySelector('time');

  expect(timestampEl).toBeInTheDocument();
  expect(timestampEl.textContent).toBeTruthy();
  expect(timestampEl.textContent).toMatchInlineSnapshot();
});

it('Bulleted List Item', () => {
  const bulletedListEl = document.querySelector('main li');

  if (bulletedListEl) {
    expect(bulletedListEl).toBeInTheDocument();
    expect(bulletedListEl.textContent).toBeTruthy();
    expect(bulletedListEl.textContent).toMatchInlineSnapshot();
  }
});

it('Related Content', () => {
  const relatedContentListEl = document.querySelector('section li');

  if (relatedContentListEl) {
    expect(relatedContentListEl).toBeInTheDocument();
    expect(relatedContentListEl.textContent).toBeTruthy();
    expect(relatedContentListEl.textContent).toMatchInlineSnapshot();
  }
});
