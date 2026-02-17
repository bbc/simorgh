/* eslint-disable no-unused-vars */

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

const runPlugin = (utils, data) => {
  const videoOverlayPlugin = new VideoOverlayPlugin(utils, data);
  return videoOverlayPlugin;
};
