import './news.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/news';

const newsTheme = {
  brandSVG,
};

export default withThemeProvider(newsTheme);
