import '../../fontFaces/noto-sans-ethiopic-regular.scss';
import '../../fontFaces/noto-sans-ethiopic-bold.scss';
import '../../fontVariants/amharic.scss';
import './palette.scss';
import '../../fontScripts/noAscOrDesc.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/amharic';

const amharicTheme = {
  brandSVG,
};

export default withThemeProvider(amharicTheme);
