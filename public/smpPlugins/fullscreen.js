// biome-ignore-all lint/complexity/useArrowFunction: we want this
// biome-ignore-all lint/correctness/noUnusedVariables: we want this

/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */

class FullScreenPlugin {
  pluginInitialisation(pluginUtils) {
    this.playerInterface = pluginUtils.playerInterface;

    this.playerInterface.addEventListener(
      'fullScreenPlugin.launchFullscreen',
      () => {
        if (!this.playerInterface.uiInfo.isFullscreen) {
          this.playerInterface.toggleFullscreen();
        }
      },
    );
  }
}

var runPlugin = function () {
  const fullScreenPlugin = new FullScreenPlugin();
  return fullScreenPlugin;
};
