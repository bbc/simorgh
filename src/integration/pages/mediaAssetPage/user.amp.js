const { amp: page } = global;

export default ({ imageUrl, mediaEmbedUrl }) => {
  it('I can see a media player placeholder image', () => {
    const placeholderImage = page.document.querySelector(
      `amp-img[src="${imageUrl}"]`,
    );

    expect(placeholderImage).toBeInTheDocument();
  });

  it('I can see a media player embed', () => {
    const mediaPlayer = page.document.querySelector(
      `amp-iframe[src="${mediaEmbedUrl}"]`,
    );

    expect(mediaPlayer).toBeInTheDocument();
  });
};
