import { RequestContext } from '#app/contexts/RequestContext';
import { use } from 'react';
import styles from './index.styles';

type BlurredBackgroundProps = {
  src: string;
};

const BlurredBackground = ({ src }: BlurredBackgroundProps) => {
  const { isLite } = use(RequestContext);
  if (isLite) return null;

  return (
    <span
      aria-hidden="true"
      css={[styles.blurredBackground, { backgroundImage: `url(${src})` }]}
    />
  );
};

export default BlurredBackground;
