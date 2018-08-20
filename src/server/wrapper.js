/* eslint func-names: ["error", "never"] */

import { ServerStyleSheet } from 'styled-components';

async function serverWrapper(App) {
  this.sheet = new ServerStyleSheet();

  return this.sheet.collectStyles(App);
}

serverWrapper.getAdditionalHeadProps = function() {
  const styles = this.sheet.getStyleElement();

  return [styles];
};

export default serverWrapper;
