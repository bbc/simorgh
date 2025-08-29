import filterForBlockType from '.';

describe('filterForBlockType', () => {
  const blocks = [
    {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              text: 'Bem-vindo à cobertura especial da BBC.',
              blocks: [],
            },
          },
        ],
      },
    },
    {
      type: 'image',
      model: {
        locator: 'ichef.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
        altText: 'Imagem de destaque da reportagem.',
        width: 1024,
        height: 576,
      },
    },
    {
      type: 'video',
      model: {
        versions: [
          {
            versionId: 'p0f7kq4z',
            duration: 180,
            kind: 'programme',
          },
        ],
        imageUrl: 'ichef.bbci.co.uk/images/ic/640x360/p0f7kq4y.jpg',
        title: 'Vídeo sobre a crise econômica',
      },
    },
  ];

  it('returns the first matching block by default', () => {
    const result = filterForBlockType(blocks, 'text');
    expect(result).toEqual(blocks[0]);
  });

  it('returns undefined if no matching block is found', () => {
    const result = filterForBlockType(blocks, 'audio');
    expect(result).toBeUndefined();
  });

  it('returns undefined if input array is null or undefined', () => {
    expect(filterForBlockType(null, 'text')).toBeUndefined();
    expect(filterForBlockType(undefined, 'video')).toBeUndefined();
  });
});
