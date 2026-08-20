import './somali.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/somali';

const somaliTheme = {
  brandSVG,
};

export default withThemeProvider(somaliTheme);
