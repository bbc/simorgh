import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/cyrillic.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ukrainian';

const ukrainianTheme = {
  brandSVG,
};

export default withThemeProvider(ukrainianTheme);
