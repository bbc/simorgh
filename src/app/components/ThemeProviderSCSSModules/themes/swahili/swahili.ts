import './swahili.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/swahili';

const swahiliTheme = {
  brandSVG,
};

export default withThemeProvider(swahiliTheme);
