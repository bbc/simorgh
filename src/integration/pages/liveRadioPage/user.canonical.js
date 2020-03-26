export default ({ audioEmbedUrl }) => {
  it('I can see an audio player embed', () => {
    const audioPlaceholderImage = canonical.document.querySelector(
      `iframe[src="${audioEmbedUrl}"]`,
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });
};
