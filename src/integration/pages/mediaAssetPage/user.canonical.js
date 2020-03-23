const { canonical: page } = global;

export default ({ mediaEmbedUrl }) => {
  it('I can see an media player embed', () => {
    const mediaPlayer = page.document.querySelector(
      `iframe[src="${mediaEmbedUrl}"]`,
    );

    expect(mediaPlayer).toBeInTheDocument();
  });
};
