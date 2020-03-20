const { amp } = global;

export default () => {
  it('should render the media player', () => {
    const mediaPlayer = amp.document.querySelector('amp-iframe'); // TODO: need a more accurate selector

    expect(mediaPlayer).toBeInTheDocument();
  });
};
