import { useEffect, useEffectEvent } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useVideoOverlayPlugin = ({
  player,
  enableVideoOverlayPlugin,
  setVideoOverlayContainer,
}) => {
  const loadPlugin = useEffectEvent(bumpPlayer => {
    bumpPlayer.loadPlugin(
      {
        html: 'https://static.files.bbci.co.uk/core/website/assets/static/scripts/smp/video-overlay-plugin.embed.869ac0e5834c1784f3ab.js',
        playerOnly: true, // do not enable this plugin for old J2 version of the SMP player due to different UI },
      },
      {
        setPluginContainer: setVideoOverlayContainer,
      },
    );
  });

  useEffect(() => {
    if (!player || !enableVideoOverlayPlugin) {
      return;
    }

    loadPlugin(player);
  }, [player, enableVideoOverlayPlugin]);
};
