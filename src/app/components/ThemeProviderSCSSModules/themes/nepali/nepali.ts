import '../../fontVariants/nepali.scss';
import './palette.scss';
import '../../fontScripts/devanagari.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/nepali';

const nepaliTheme = {
  brandSVG,
};

export default withThemeProvider(nepaliTheme);
