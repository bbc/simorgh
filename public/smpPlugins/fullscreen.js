/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */

class FullScreenPlugin {
  pluginInitialisation(pluginUtils) {
    this.playerInterface = pluginUtils.playerInterface;

    this.playerInterface.addEventListener(
      'fullScreenPlugin.launchFullscreen',
      () => {
        console.log('hello from fullScreenPluginListener');
        if (!this.playerInterface.uiInfo.isFullscreen) {
          this.playerInterface.toggleFullscreen();
        }
      },
    );
  }
}

const runPlugin = function () {
  const fullScreenPlugin = new FullScreenPlugin();

  return fullScreenPlugin;
};
