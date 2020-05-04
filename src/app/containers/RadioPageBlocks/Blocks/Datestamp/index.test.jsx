// import React from 'react';
// import {
//   shouldMatchSnapshot,
//   isNull,
//   suppressPropWarnings,
// } from '@bbc/psammead-test-helpers';
// import { ServiceContextProvider } from '#contexts/ServiceContext';
// import Datestamp from '.';

// describe('AudioPlayer blocks DateStamp', () => {
//   shouldMatchSnapshot(
//     'should render correctly',
//     <ServiceContextProvider service="news">

//     </ServiceContextProvider>,
//   );

//   describe('when timestamp isnt provided', () => {
//     suppressPropWarnings(['text', 'undefined']);

//     isNull(
//       'should render null',
//       <ServiceContextProvider service="news">
//         <Datestamp uuid="uuid" idAttr="idAttr" />
//       </ServiceContextProvider>,
//     );
//   });
// });
