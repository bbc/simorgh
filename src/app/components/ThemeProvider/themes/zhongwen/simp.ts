import { ServiceTheme } from '#app/models/types/theming';
import withThemeProvider from '../../withThemeProvider';
import zhongwenTheme from './base';

export const theme: ServiceTheme = zhongwenTheme;

export default withThemeProvider(zhongwenTheme);
