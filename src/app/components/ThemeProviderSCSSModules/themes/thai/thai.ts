import './thai.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/thai';

const thaiTheme = {
  brandSVG,
};

export default withThemeProvider(thaiTheme);
