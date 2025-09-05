import '../../fontFaces/reith-sans-bold.module.scss';
import '../../fontFaces/reith-sans-regular.module.scss';
import '../../fontFaces/reith-serif-medium.module.scss';
import '../../fontFaces/reith-serif-light.module.scss';
import '../../fontVariants/reith.module.scss';
import './palette.module.scss';
import '../../fontScripts/latinWithDiacritics.module.scss';
import brandSVG from '../../chameleonLogos/mundo';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';

const mundoTheme = {
  brandSVG,
};

export default withThemeProvider(mundoTheme);
