import './turkce.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/turkce';

const turkceTheme = {
  brandSVG,
};

export default withThemeProvider(turkceTheme);
