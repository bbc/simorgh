import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latin.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/indonesia';

const indonesiaTheme = {
  brandSVG,
};

export default withThemeProvider(indonesiaTheme);
