import './urdu.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/urdu';

const urduTheme = {
  brandSVG,
};

export default withThemeProvider(urduTheme);
