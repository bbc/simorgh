import './vietnamese.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/vietnamese';

const vietnameseTheme = {
  brandSVG,
};

export default withThemeProvider(vietnameseTheme);
