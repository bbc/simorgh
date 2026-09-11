import '../../fontFaces/reith-sans-bold.scss';
import '../../fontFaces/reith-sans-regular.scss';
import '../../fontFaces/reith-serif-medium.scss';
import '../../fontFaces/reith-serif-light.scss';
import '../../fontVariants/reith.scss';
import './palette.scss';
import '../../fontScripts/latin.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/news';

const newsTheme = {
  brandSVG,
};

export default withThemeProvider(newsTheme);
