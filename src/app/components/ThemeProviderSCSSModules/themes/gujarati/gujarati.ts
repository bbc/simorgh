import './gujarati.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/gujarati';

const gujaratiTheme = {
  brandSVG,
};

export default withThemeProvider(gujaratiTheme);
