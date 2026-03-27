import '../../fontFaces/noto-serif-sinhala-regular.scss';
import '../../fontFaces/noto-serif-sinhala-bold.scss';
import '../../fontVariants/sinhala.scss';
import './palette.scss';
import '../../fontScripts/sinhalese.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/sinhala';

const sinhalaTheme = {
  brandSVG,
};

export default withThemeProvider(sinhalaTheme);
