export const cpsImageBlock = {
  id: '63724392',
  subType: 'photogallery',
  href:
    'http://b.files.bbci.co.uk/729E/test/_63724392_gettyimages-1098075358.jpg',
  path: '/cpsdevpb/729E/test/_63724392_gettyimages-1098075358.jpg',
  height: 549,
  width: 976,
  altText: 'alt text',
  caption: 'image caption',
  copyrightHolder: 'Joe Maher',
  type: 'image',
};

export const captionBlock = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: { attributes: [], text: 'image caption' },
                    type: 'fragment',
                    id: null,
                  },
                ],
                text: 'image caption',
              },
              type: 'paragraph',
              id: null,
            },
          ],
        },
        type: 'text',
        id: null,
      },
    ],
  },
  type: 'caption',
  id: null,
};

export const altTextBlock = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: { attributes: [], text: 'alt text' },
                    type: 'fragment',
                    id: null,
                  },
                ],
                text: 'alt text',
              },
              type: 'paragraph',
              id: null,
            },
          ],
        },
        type: 'text',
        id: null,
      },
    ],
  },
  type: 'altText',
  id: null,
};

export const rawImageBlock = {
  model: {
    copyrightHolder: 'Joe Maher',
    height: 549,
    locator: '729E/test/_63724392_gettyimages-1098075358.jpg',
    originCode: 'cpsdevpb',
    width: 976,
  },
  type: 'rawImage',
};
