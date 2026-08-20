import './pashto.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/pashto';

const pashtoTheme = {
  brandSVG,
};

export default withThemeProvider(pashtoTheme);
