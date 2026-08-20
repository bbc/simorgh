import './arabic.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/arabic';

const arabicTheme = {
  brandSVG,
};

export default withThemeProvider(arabicTheme);
