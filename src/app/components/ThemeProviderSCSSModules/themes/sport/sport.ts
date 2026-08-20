import './sport.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/sport';

const sportTheme = {
  brandSVG,
};

export default withThemeProvider(sportTheme);
