import './archive.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/archive';

const archiveTheme = {
  brandSVG,
};

export default withThemeProvider(archiveTheme);
