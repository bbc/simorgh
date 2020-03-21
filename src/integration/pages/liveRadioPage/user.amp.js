const { amp } = global;

export default ({ audioEmbedUrl }) => {
  it('I can see an audio player image placeholder', () => {
    const audioPlaceholderImage = amp.document.querySelector(
      'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });

  it('I can see an audio player embed', () => {
    const audioPlaceholderImage = amp.document.querySelector(
      `amp-iframe[src="${audioEmbedUrl}"]`,
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });
};
