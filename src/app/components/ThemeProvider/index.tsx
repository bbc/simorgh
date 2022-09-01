import loadable, { LoadableComponent } from '@loadable/component';
import { Services } from '../../models/types/global';

interface Props {
  service: Services;
}

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(`./themes/${props.service}`);

const ThemeProvider: LoadableComponent<Props> = loadable(loadTheme);

export default ThemeProvider;
