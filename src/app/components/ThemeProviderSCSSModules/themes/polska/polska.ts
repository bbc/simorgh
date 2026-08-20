import './polska.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/polska';

const polskaTheme = {
  brandSVG,
};

export default withThemeProvider(polskaTheme);
