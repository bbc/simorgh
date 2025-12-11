import styles from './index.styles';

type BlurredBackgroundProps = {
  src?: string;
};

const BlurredBackground = ({ src }: BlurredBackgroundProps) => {
  const lowResImageSrc = src?.replace('{width}', '10');
  return (
    <span
      aria-hidden="true"
      css={[
        styles.blurredBackground,
        src && { backgroundImage: `url(${lowResImageSrc})` },
      ]}
    />
  );
};

export default BlurredBackground;
