import './sinhala.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/sinhala';

const sinhalaTheme = {
  brandSVG,
};

export default withThemeProvider(sinhalaTheme);
