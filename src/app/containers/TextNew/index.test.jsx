// import React from 'react';
// import {
//   shouldShallowMatchSnapshot,
//   isNull,
// } from '../../helpers/tests/testHelpers';
// import TextWithFragmentAndUrlLink from './index';

// describe('TextWithFragmentAndUrlLink', () => {
//   describe('with no data', () => {
//     isNull('should return null', <TextWithFragmentAndUrlLink />);
//   });

//   describe('with data', () => {
//     const paragraphBlock = text => ({
//       type: 'paragraph',
//       model: {
//         text,
//       },
//     });

//     const data = {
//       blocks: [
//         paragraphBlock('This is a 1st paragraph block.'),
//         paragraphBlock('This is a 2nd paragraph block.'),
//         paragraphBlock('This is a 3rd paragraph block.'),
//         paragraphBlock('This is a 4th paragraph block..'),
//         paragraphBlock('This is a 5th paragraph block.'),
//       ],
//     };

//     shouldShallowMatchSnapshot(
//       'should render correctly',
//       <TextWithFragmentAndUrlLink {...data} />,
//     );

//     describe('with a passed previous block type', () => {
//       shouldShallowMatchSnapshot(
//         'should render correctly',
//         <TextWithFragmentAndUrlLink
//           {...data}
//           type="text"
//           typeOfPreviousBlock="text"
//         />,
//       );
//     });
//   });
// });
