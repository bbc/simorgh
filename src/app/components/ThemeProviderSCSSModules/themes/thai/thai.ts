import '../../fontVariants/thai.scss';
import './palette.scss';
import '../../fontScripts/thai.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/thai';

const thaiTheme = {
  brandSVG,
};

export default withThemeProvider(thaiTheme);
