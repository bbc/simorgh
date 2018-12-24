function getImageProps(image, includeHeight) {
  const props = {
    alt: image.alt,
    src: image.src,
    width: image.width,
  };
  props.height = includeHeight ? image.height : null;
  return props;
}

export default getImageProps;
