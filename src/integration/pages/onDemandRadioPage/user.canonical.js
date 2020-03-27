export default ({ audioEmbedUrl }) => {
  it('I can see an audio player embed', () => {
    const audioPlayer = canonical.document.querySelector(
      `iframe[src="${audioEmbedUrl}"]`,
    );

    expect(audioPlayer).toBeInTheDocument();
  });
};
