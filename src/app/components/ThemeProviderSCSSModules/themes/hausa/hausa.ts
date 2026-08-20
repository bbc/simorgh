import './hausa.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/hausa';

const hausaTheme = {
  brandSVG,
};

export default withThemeProvider(hausaTheme);
