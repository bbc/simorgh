import './mundo.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/mundo';

const mundoTheme = {
  brandSVG,
};

export default withThemeProvider(mundoTheme);
