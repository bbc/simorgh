import './marathi.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/marathi';

const marathiTheme = {
  brandSVG,
};

export default withThemeProvider(marathiTheme);
