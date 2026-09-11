import '../../fontFaces/noto-sans-gujarati-regular.scss';
import '../../fontFaces/noto-sans-gujarati-bold.scss';
import '../../fontVariants/gujarati.scss';
import './palette.scss';
import '../../fontScripts/devanagari.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/gujarati';

const gujaratiTheme = {
  brandSVG,
};

export default withThemeProvider(gujaratiTheme);
