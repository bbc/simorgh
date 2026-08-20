import './amharic.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/amharic';

const amharicTheme = {
  brandSVG,
};

export default withThemeProvider(amharicTheme);
