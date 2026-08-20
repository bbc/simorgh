import './hindi.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/hindi';

const hindiTheme = {
  brandSVG,
};

export default withThemeProvider(hindiTheme);
