import './japanese.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/japanese';

const japaneseTheme = {
  brandSVG,
};

export default withThemeProvider(japaneseTheme);
