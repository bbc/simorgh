import { withEpisodeContext } from './helpers';

const DateTimeDuration = ({
  children,
  script,
  service,
  theme,
  hasBorder,
  dir,
  ...props
}) => (
  <span
    {...props}
    className={`text-brevier ${
      theme.isDarkUi ? 'text-pebble' : 'text-metal'
    } ${
      hasBorder
        ? dir === 'ltr'
          ? 'pl-full ml-full border-l border-pebble'
          : 'pr-full mr-full border-r border-pebble'
        : ''
    }`}
  >
    {children}
  </span>
);

export default withEpisodeContext(DateTimeDuration);
