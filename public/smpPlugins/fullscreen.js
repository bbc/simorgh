/* eslint-disable no-unused-vars */

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

const runPlugin = () => {
  const fullScreenPlugin = new FullScreenPlugin();

  return fullScreenPlugin;
};
