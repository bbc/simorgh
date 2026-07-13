import '../../fontFaces/reith-qalam-regular.scss';
import '../../fontFaces/reith-qalam-bold.scss';
import '../../fontVariants/reithQalam.scss';
import './palette.scss';
import '../../fontScripts/arabic.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/dari';

const dariTheme = {
  brandSVG,
};

export default withThemeProvider(dariTheme);
