import './newsround.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/newsround';

const newsroundTheme = {
  brandSVG,
};

export default withThemeProvider(newsroundTheme);
