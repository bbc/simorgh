const { canonical } = global;

export default () => {
  it('should render the media player', () => {
    const mediaPlayer = canonical.document.querySelector('iframe'); // TODO: need a more accurate selector

    expect(mediaPlayer).toBeInTheDocument();
  });
};
