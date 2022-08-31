import loadable, { LoadableComponent } from '@loadable/component';
import { Services } from '../../models/types/global';

interface Props {
  service: Services;
  variant: null | 'cyr' | 'lat' | 'simp' | 'trad';
}

// This is to support local 404 and 500 pages for services with variants.
// For example, http://localhost:7080/serbian/500 does not include the variant in the path so we must define a default variant.
// NB These routes do not exist on live. They are for dev and testing purposes.
const defaultServiceVariants: { [index: string]: any } = {
  serbian: 'cyr',
  ukchina: 'simp',
  zhongwen: 'simp',
};

const getPathToTheme = (props: Props) => {
  const variant = props.variant || defaultServiceVariants[props.service];

  return variant ? `${props.service}/${variant}` : props.service;
};

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(`./themes/${getPathToTheme(props)}`);

const ThemeProvider: LoadableComponent<Props> = loadable(loadTheme);

export default ThemeProvider;
