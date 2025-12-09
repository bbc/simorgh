import styles from './index.styles';

type BlurredBackgroundProps = {
  src?: string;
};

const BlurredBackground = ({ src }: BlurredBackgroundProps) => {
  return (
    <span
      css={[
        styles.blurredBackground,
        src && { backgroundImage: `url(${src})` },
      ]}
    />
  );
};

export default BlurredBackground;
