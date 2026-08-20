import './portuguese.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/portuguese';

const portugueseTheme = {
  brandSVG,
};

export default withThemeProvider(portugueseTheme);
