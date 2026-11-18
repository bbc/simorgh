import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import onClient from '#app/lib/utilities/onClient';

const isMobile = () => {
  if (!onClient()) return false;

  return window.matchMedia(`(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`).matches;
};

export default isMobile;
