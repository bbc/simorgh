import '../../fontFaces/noto-sans-ethiopic-regular.scss';
import '../../fontFaces/noto-sans-ethiopic-bold.scss';
import '../../fontVariants/tigrinya.scss';
import './palette.scss';
import '../../fontScripts/noAscOrDesc.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/tigrinya';

const tigrinyaTheme = {
  brandSVG,
};

export default withThemeProvider(tigrinyaTheme);
