export default {
  content: {
    blocks: [
      {
        required: false,
        tile: 'A quiz!',
        href: '/indepthtoolkit/quizzes/123-456',
        platform: 'highweb',
        type: 'include',
      },
      {
        required: false,
        tile: 'IDT2 Include',
        href: '/idt2/111-222-333-444-555',
        platform: 'highweb',
        type: 'include',
        idt2: {
          altText: 'image alt text',
          dimensions: {
            small: {
              href: '/idt2/111-222-333-444-555/image/350',
              width: 700,
              height: 1864,
            },
            medium: {
              href: '/idt2/111-222-333-444-555/image/470',
              width: 940,
              height: 1864,
            },
            large: {
              href: '/idt2/111-222-333-444-555/image/816',
              width: 1632,
              height: 1864,
            },
          },
          copyrightHolder: 'Source: BBC',
          published: 1550229370779,
        },
      },
      {
        required: false,
        tile: 'Include from VisJo',
        href: '/include/111-222-333-444-555',
        platform: 'highweb',
        type: 'include',
      },
      {
        required: false,
        tile: 'A random include',
        href: '/idt3/111-222-333-444-555',
        platform: 'highweb',
        type: 'include',
      },
      {
        required: false,
        tile: 'An include with no href',
        href: null,
        platform: 'highweb',
        type: 'include',
      },
      {
        required: false,
        tile: 'A quiz!',
        href: '/indepthtoolkit/quizzes/123-456',
        platform: 'highweb',
        type: 'include',
      },
    ],
  },
};
