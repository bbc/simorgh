import clsx from 'clsx';
import { withEpisodeContext } from './helpers';
import styles from './DateTimeDuration.module.scss';

const DateTimeDuration = ({
  as: Component = 'span',
  hasBorder = false,
  dir,
  className,
  ref,
  ...props
}) => (
  <Component
    {...props}
    dir={dir}
    ref={ref}
    className={clsx(
      styles.dateTimeDuration,
      hasBorder && styles.hasBorder,
      className,
    )}
  />
);

export default withEpisodeContext(DateTimeDuration);
