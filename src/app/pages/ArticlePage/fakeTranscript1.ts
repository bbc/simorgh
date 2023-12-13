const fakeTranscript1 = {
  id: '6d3f4e5g',
  type: 'transcript',
  model: {
    blocks: [
      {
        id: 'bfb239d2',
        type: 'text',
        model: {
          blocks: [
            {
              id: 'b51189fc',
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    id: '03eb2c7c',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '4900d19e',
                          type: 'paragraph',
                          model: {
                            text: '00:00: Encontramos los niños.',
                            blocks: [
                              {
                                id: '4264a85f',
                                type: 'timestamp',
                                model: {
                                  text: '00:00',
                                  attributes: [''],
                                },
                                position: [2, 1, 1, 1, 1, 1],
                              },
                              {
                                id: '4264a85f',
                                type: 'fragment',
                                model: {
                                  text: ' Encontramos los niños.',
                                  attributes: [],
                                },
                                position: [2, 1, 1, 1, 1, 1],
                              },
                            ],
                          },
                          position: [2, 1, 1, 1, 1],
                        },
                      ],
                    },
                  },
                  {
                    id: '03eb2c7c',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '4900d19e',
                          type: 'paragraph',
                          model: {
                            text: '00:01: Dios, Bendito sea mi Dios, Bendito sea\nDios.',
                            blocks: [
                              {
                                id: '4264a85f',
                                type: 'timestamp',
                                model: {
                                  text: '00:01',
                                  attributes: [''],
                                },
                                position: [2, 1, 1, 1, 1, 1],
                              },
                              {
                                id: '4264a85f',
                                type: 'fragment',
                                model: {
                                  text: ' Dios, Bendito sea mi Dios, Bendito sea\nDios.',
                                  attributes: [''],
                                },
                                position: [2, 1, 1, 1, 1, 1],
                              },
                            ],
                          },
                          position: [2, 1, 1, 1, 1],
                        },
                      ],
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

export default fakeTranscript1;

//   {
//   [
//     {
//       text: '00:00: Encontramos los niños.',
//       start: '00:00',
//     },
//     {
//       text: 'Dios, Bendito sea mi Dios, Bendito sea\nDios.',
//       start: '00:01',
//     },
//     {
//       text: 'Nosotros encontramos a los niños.',
//       start: '00:03',
//     },
//   ];
// }
