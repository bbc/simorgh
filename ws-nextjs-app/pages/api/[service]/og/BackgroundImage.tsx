const BackgroundImage = ({ image }: { image: string }) => (
  <img
    src={image.replace('.webp', '')}
    alt="background"
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
);

export default BackgroundImage;
