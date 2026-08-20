import './cymrufyw.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/cymrufyw';

const cymrufywTheme = {
  brandSVG,
};

export default withThemeProvider(cymrufywTheme);
