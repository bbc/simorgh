import './magyarul.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/magyarul';

const magyarulTheme = {
  brandSVG,
};

export default withThemeProvider(magyarulTheme);
