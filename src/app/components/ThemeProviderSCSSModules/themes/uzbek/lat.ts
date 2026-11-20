import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latinWithDiacritics.scss';
import '../../pwaTypography/reith.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/uzbek';

const uzbeklatTheme = {
  brandSVG,
};

export default withThemeProvider(uzbeklatTheme);
