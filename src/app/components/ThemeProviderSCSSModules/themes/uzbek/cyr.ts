import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/cyrillic.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/uzbek';

const uzbekcyrTheme = {
  brandSVG,
};

export default withThemeProvider(uzbekcyrTheme);
