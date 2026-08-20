import './bengali.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/bengali';

const bengaliTheme = {
  brandSVG,
};

export default withThemeProvider(bengaliTheme);
