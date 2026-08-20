import './burmese.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/burmese';

const burmeseTheme = {
  brandSVG,
};

export default withThemeProvider(burmeseTheme);
