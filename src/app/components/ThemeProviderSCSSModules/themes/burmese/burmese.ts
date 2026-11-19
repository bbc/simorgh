import '../../fontFaces/padauk-regular.scss';
import '../../fontFaces/padauk-bold.scss';
import '../../fontVariants/burmese.scss';
import './palette.scss';
import '../../fontScripts/burmese.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/burmese';

const burmeseTheme = {
  brandSVG,
};

export default withThemeProvider(burmeseTheme);
