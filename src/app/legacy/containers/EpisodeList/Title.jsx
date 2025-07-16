import { withEpisodeContext } from './helpers';

const Title = ({ children, script, service, theme, ...props }) => (
  <span
    {...props}
    className={`text-pica ${
      theme.isDarkUi ? 'text-white' : 'text-ebon'
    } inline-block w-full font-bold`}
  >
    {children}
  </span>
);

export default withEpisodeContext(Title);
