import './naidheachdan.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/naidheachdan';

const naidheachdanTheme = {
  brandSVG,
};

export default withThemeProvider(naidheachdanTheme);
