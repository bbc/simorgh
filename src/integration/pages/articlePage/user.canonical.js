export default ({ imageAltText, imageCaptionText }) => {
  it('I can see an image with a caption', () => {
    const imageEl = canonical.getByAltText(imageAltText);
    const imageCaptionEl = canonical.getByText(imageCaptionText);

    expect(imageEl).toBeInTheDocument();
    expect(imageCaptionEl).toBeInTheDocument();
  });
};
