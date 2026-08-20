import './ukrainian.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ukrainian';

const ukrainianTheme = {
  brandSVG,
};

export default withThemeProvider(ukrainianTheme);
