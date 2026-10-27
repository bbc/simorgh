import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/cyrillic.scss';
import '../../pwaTypography/reith.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/serbian';

const serbiancyrTheme = {
  brandSVG,
};

export default withThemeProvider(serbiancyrTheme);
