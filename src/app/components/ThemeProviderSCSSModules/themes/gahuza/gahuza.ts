import './gahuza.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/gahuza';

const gahuzaTheme = {
  brandSVG,
};

export default withThemeProvider(gahuzaTheme);
