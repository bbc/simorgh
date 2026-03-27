import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latinWithDiacritics.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/azeri';

const azeriTheme = {
  brandSVG,
};

export default withThemeProvider(azeriTheme);
