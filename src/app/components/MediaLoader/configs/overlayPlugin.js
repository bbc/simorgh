/* eslint-disable fp/no-class */
/* eslint-disable import/no-commonjs */

class VideoOverlayPlugin {
  constructor(utils, data = {}) {
    this.utils = utils;
    this.pluginData = data;
  }

  pluginInitialisation(pluginUtils) {
    pluginUtils.register({ name: 'videoOverlayPlugin' });
    this.playerInterface = pluginUtils.playerInterface;

    const { setPluginContainer, moveSubtitlesToTopWhenControlsActive = true } =
      this.pluginData;

    const getReservedArea = () => {
      return this.playerInterface.container
        .querySelector('[data-region-exclude-subtitles]')
        ?.getBoundingClientRect();
    };

    this.playerInterface.addEventListener('uiControlBarShown', () => {
      if (moveSubtitlesToTopWhenControlsActive)
        this.playerInterface.addRegionFunction(getReservedArea);
    });

    this.playerInterface.addEventListener('uiControlBarHidden', () => {
      if (moveSubtitlesToTopWhenControlsActive)
        this.playerInterface.removeRegionFunction(getReservedArea);
    });

    if (setPluginContainer) {
      setPluginContainer(this.playerInterface.container);
    }
  }
}

var runPlugin = function (utils, data) {
  const videoOverlayPlugin = new VideoOverlayPlugin(utils, data);
  return videoOverlayPlugin;
};

// We need to export runPlugin for a unit test, but this will throw an error when loaded by SMP
try {
  module.exports = { runPlugin };
} catch {
  /* no-op */
}
