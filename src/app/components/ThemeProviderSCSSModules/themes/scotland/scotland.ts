import './scotland.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/scotland';

const scotlandTheme = {
  brandSVG,
};

export default withThemeProvider(scotlandTheme);
