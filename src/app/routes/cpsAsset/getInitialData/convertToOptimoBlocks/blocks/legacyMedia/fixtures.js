export const legacyMediaBlock = {
  id: '43703851',
  subType: 'primary',
  format: 'video',
  aspectRatio: '16:9',
  live: false,
  href:
    'http://www.bbc.co.uk/russian/meta/dps/2016/05/emp/160505_v_diving_record.emp.xml',
  type: 'legacyMedia',
};

export const legacyOptimoVideoBlock = {
  type: 'legacyMedia',
  model: {
    locator: `urn:bbc:pips:pid:43703851`,
    blocks: [
      {
        type: 'aresMedia',
        model: {
          blocks: [
            {
              type: 'aresMediaMetadata',
              blockId: `urn:bbc:ares::primary:43703851`,
              model: {
                available: true,
                blockId: '43703851',
                format: 'audio_video',
              },
            },
          ],
        },
      },
    ],
  },
};
