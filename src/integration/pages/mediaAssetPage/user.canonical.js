export default ({ mediaEmbedUrl }) => {
  it('I can see an media player embed', () => {
    const mediaPlayer = canonical.document.querySelector(
      `iframe[src="${mediaEmbedUrl}"]`,
    );

    expect(mediaPlayer).toBeInTheDocument();
  });
};
