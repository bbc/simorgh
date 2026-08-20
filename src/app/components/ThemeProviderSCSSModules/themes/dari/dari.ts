import './dari.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/dari';

const dariTheme = {
  brandSVG,
};

export default withThemeProvider(dariTheme);
