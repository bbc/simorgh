import './telugu.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/telugu';

const teluguTheme = {
  brandSVG,
};

export default withThemeProvider(teluguTheme);
