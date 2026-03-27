import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latin.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/pidgin';

const pidginTheme = {
  brandSVG,
};

export default withThemeProvider(pidginTheme);
