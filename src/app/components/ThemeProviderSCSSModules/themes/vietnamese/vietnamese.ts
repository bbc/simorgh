import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latinWithDiacritics.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/vietnamese';

const vietnameseTheme = {
  brandSVG,
};

export default withThemeProvider(vietnameseTheme);
