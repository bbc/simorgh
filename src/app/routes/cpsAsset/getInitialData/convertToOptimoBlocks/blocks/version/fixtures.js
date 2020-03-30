export const CPSVersionBlock = {
  id: '63501296',
  subType: 'primary',
  format: 'video',
  externalId: 'journalism_world_service_stream_01',
  duration: 'PT0S',
  caption: 'live stream from event',
  image: {
    id: '63501296',
    subType: 'thumbnail',
    href: 'http://b.files.bbci.co.uk/15E0C/test/_63721698_p01kx435.jpg',
    path: '/cpsdevpb/15E0C/test/_63721698_p01kx435.jpg',
    height: 360,
    width: 640,
    altText: 'connectionAltText',
    copyrightHolder: 'BBC',
    type: 'image',
  },
  embedding: false,
  available: true,
  live: true,
  type: 'version',
};

export const optimoVersionBlock = {
  type: 'version',
  model: {
    locator: 'urn:bbc:pips:pid:63501296',
    blocks: [
      {
        type: 'aresMedia',
        model: {
          blocks: [
            {
              type: 'aresMediaMetadata',
              blockId: 'urn:bbc:ares::primary:63501296',
              model: {
                embedding: false,
                available: true,
                format: 'audio_video',
                live: true,
                id: '63501296',
                imageCopyright: 'BBC',
                imageUrl:
                  'http://b.files.bbci.co.uk/15E0C/test/_63721698_p01kx435.jpg',
                subType: 'primary',
                synopses: {
                  short: 'live stream from event',
                  long: 'live stream from event',
                  medium: 'live stream from event',
                },
                title: 'live stream from event',
                versions: [
                  {
                    kind: 'programme',
                    live: true,
                    versionId: 'journalism_world_service_stream_01',
                  },
                ],
              },
            },
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'rawImage',
                    model: {
                      copyrightHolder: 'BBC',
                      locator:
                        'http://b.files.bbci.co.uk/15E0C/test/_63721698_p01kx435.jpg',
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
