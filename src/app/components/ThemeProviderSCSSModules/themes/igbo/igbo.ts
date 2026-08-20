import './igbo.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/igbo';

const igboTheme = {
  brandSVG,
};

export default withThemeProvider(igboTheme);
