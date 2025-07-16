import { withEpisodeContext } from './helpers';

const Description = ({ children, script, service, theme, ...props }) => (
  <span
    {...props}
    className={`text-longPrimer ${
      theme.isDarkUi ? 'text-white' : 'text-ebon'
    } inline-block w-full my-half`}
  >
    {children}
  </span>
);

export default withEpisodeContext(Description);
