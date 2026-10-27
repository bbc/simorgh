import '../../fontFaces/noto-sans-telugu-regular.scss';
import '../../fontFaces/noto-sans-telugu-bold.scss';
import '../../fontVariants/telugu.scss';
import './palette.scss';
import '../../fontScripts/devanagari.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/telugu';

const teluguTheme = {
  brandSVG,
};

export default withThemeProvider(teluguTheme);
