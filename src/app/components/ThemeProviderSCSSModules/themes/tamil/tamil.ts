import './tamil.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/tamil';

const tamilTheme = {
  brandSVG,
};

export default withThemeProvider(tamilTheme);
