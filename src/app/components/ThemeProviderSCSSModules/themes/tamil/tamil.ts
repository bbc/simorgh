import '../../fontFaces/noto-sans-tamil-regular.scss';
import '../../fontFaces/noto-sans-tamil-bold.scss';
import '../../fontVariants/tamil.scss';
import './palette.scss';
import '../../fontScripts/tamil.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/tamil';

const tamilTheme = {
  brandSVG,
};

export default withThemeProvider(tamilTheme);
