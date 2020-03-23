const { canonical: page } = global;

export default () => {
  it('should render the media player', () => {
    const mediaPlayer = page.document.querySelector('iframe'); // TODO: need a more accurate selector

    expect(mediaPlayer).toBeInTheDocument();
  });
};
