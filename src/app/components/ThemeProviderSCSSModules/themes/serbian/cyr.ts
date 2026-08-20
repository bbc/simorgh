import './cyr.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/serbian';

const serbiancyrTheme = {
  brandSVG,
};

export default withThemeProvider(serbiancyrTheme);
