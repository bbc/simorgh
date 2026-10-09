import '../../fontVariants/hindi.scss';
import './palette.scss';
import '../../fontScripts/devanagari.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/hindi';

const hindiTheme = {
  brandSVG,
};

export default withThemeProvider(hindiTheme);
