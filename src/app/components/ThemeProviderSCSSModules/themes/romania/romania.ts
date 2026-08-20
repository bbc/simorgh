import './romania.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/romania';

const romaniaTheme = {
  brandSVG,
};

export default withThemeProvider(romaniaTheme);
