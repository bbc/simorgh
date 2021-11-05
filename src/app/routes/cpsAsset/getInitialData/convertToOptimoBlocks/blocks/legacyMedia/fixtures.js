export const legacyMediaBlock = {
  id: '43703851',
  subType: 'primary',
  format: 'video',
  aspectRatio: '16:9',
  live: false,
  href: 'http://www.bbc.co.uk/russian/meta/dps/2016/05/emp/160505_v_diving_record.emp.xml',
  image: {
    href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/05/05/160505093650_freediving_640x360_bbc_nocredit.jpg',
  },
  type: 'legacyMedia',
};

export const legacyMedia = {
  content: {
    blocks: [legacyMediaBlock],
  },
  promo: {
    headlines: {
      headline: 'Новый рекорд фридайвинга: 124 метра под водой без акваланга',
      shortHeadline:
        'Новый рекорд во фридайвинге: 124 метра под водой без акваланга',
    },
  },
  metadata: {
    firstPublished: 1462441945000,
  },
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
                imageUrl:
                  'https://a.files.bbci.co.uk/worldservice/live/assets/images/2016/05/05/160505093650_freediving_640x360_bbc_nocredit.jpg',
                synopses: {
                  short:
                    'Новый рекорд во фридайвинге: 124 метра под водой без акваланга',
                },
                title:
                  'Новый рекорд фридайвинга: 124 метра под водой без акваланга',
                firstPublished: 1462441945000,
              },
            },
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'rawImage',
                    model: {
                      copyrightHolder: '',
                      locator: `http://localhost:7080/images/media_placeholder.png`,
                      originCode: 'pips',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
