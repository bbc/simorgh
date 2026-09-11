import '../../fontFaces/noto-serif-bengali-regular.scss';
import '../../fontFaces/noto-serif-bengali-bold.scss';
import '../../fontVariants/bengali.scss';
import './palette.scss';
import '../../fontScripts/bengali.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/bengali';

const bengaliTheme = {
  brandSVG,
};

export default withThemeProvider(bengaliTheme);
