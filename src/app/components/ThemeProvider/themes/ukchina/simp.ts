import { ServiceTheme } from '#app/models/types/theming';
import withThemeProvider from '../../withThemeProvider';
import ukChinaTheme from './base';

export const theme: ServiceTheme = ukChinaTheme;

export default withThemeProvider(ukChinaTheme);
