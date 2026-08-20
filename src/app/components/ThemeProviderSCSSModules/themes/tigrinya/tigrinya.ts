import './tigrinya.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/tigrinya';

const tigrinyaTheme = {
  brandSVG,
};

export default withThemeProvider(tigrinyaTheme);
