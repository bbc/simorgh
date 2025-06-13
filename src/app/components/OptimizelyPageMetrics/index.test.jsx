// /* eslint-disable no-console */
// import React from 'react';
// import { render, waitFor, act } from '@testing-library/react';
// import { OptimizelyProvider } from '@optimizely/react-sdk';

// import { RequestContextProvider } from '#contexts/RequestContext';
// import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
// import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

// import OptimizelyPageMetrics from '.';

// jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

// const optimizely = {
//   onReady: jest.fn(() => Promise.resolve()),
//   track: jest.fn(),
//   setUser: jest.fn(() => Promise.resolve()),
// };

// const observers = new Map();

// const IntersectionObserver = jest.fn(cb => {
//   const item = {
//     callback: cb,
//     elements: new Set(),
//   };

//   const instance = {
//     observe: jest.fn(element => {
//       item.elements.add(element);
//     }),
//     disconnect: jest.fn(() => {
//       item.elements.clear();
//     }),
//   };

//   observers.set(instance, item);

//   return instance;
// });

// const getObserverInstance = element => {
//   try {
//     const [instance] = Array.from(observers).find(([, item]) =>
//       item.elements.has(element),
//     );

//     return instance;
//   } catch (e) {
//     throw new Error('Failed to find IntersectionObserver for element.');
//   }
// };

// const triggerIntersection = ({ changes, observer }) => {
//   const item = observers.get(observer);

//   item.callback(changes);
// };

// const ContextWrap = ({ pageType, isAmp, children, service }) => (
//   <RequestContextProvider
//     isAmp={isAmp}
//     pageType={pageType}
//     service={service}
//     pathname="/pathname"
//   >
//     <OptimizelyProvider optimizely={optimizely} isServerSide>
//       {children}
//     </OptimizelyProvider>
//   </RequestContextProvider>
// );

// const { error } = console;

// beforeEach(() => {
//   jest.clearAllMocks();
//   jest.useFakeTimers();
//   console.error = jest.fn();
//   global.IntersectionObserver = IntersectionObserver;
// });

// afterEach(() => {
//   jest.runOnlyPendingTimers();
//   jest.useRealTimers();
//   console.error = error;
//   observers.clear();
// });

// describe('Optimizely Page Complete tracking', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   // add more
//   // rewrite
//   it('should not call Optimizely track function for Article Page on page render if no props are supplied', async () => {
//     useOptimizelyVariation.mockReturnValue('variation_1');

//     render(
//       <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
//         <OptimizelyPageMetrics />
//       </ContextWrap>,
//     );

//     await waitFor(() => {
//       expect(optimizely.track).toHaveBeenCalledTimes(0);
//     });
//   });

//   it('should not call Optimizely track function for Article Page on page render if ...trackPageView', async () => {
//     useOptimizelyVariation.mockReturnValue('variation_1');

//     render(
//       <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
//         <OptimizelyPageMetrics trackPageView />
//       </ContextWrap>,
//     );

//     await waitFor(() => {
//       expect(optimizely.track).toHaveBeenCalledTimes(1);
//       expect(optimizely.track).toHaveBeenCalledWith('page-views');
//     });
//   });

//   // rewrite so it's checking whats being called
//   it.skip('should not send tracking event when pageComplete is false', async () => {
//     useOptimizelyVariation.mockReturnValue('variation_1');

//     const { container } = render(
//       <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
//         <OptimizelyPageMetrics />
//       </ContextWrap>,
//     );

//     const element = container.getElementsByTagName('div')[0];
//     const observerInstance = getObserverInstance(element);

//     act(() => {
//       triggerIntersection({
//         changes: [{ isIntersecting: true }],
//         observer: observerInstance,
//       });
//     });

//     await Promise.resolve();

//     expect(global.IntersectionObserver).toHaveBeenCalledTimes(0);
//     expect(optimizely.track).toHaveBeenCalledTimes(0);
//   });

//   // rewrite
//   it('should do both things', async () => {
//     useOptimizelyVariation.mockReturnValue('variation_1');

//     const { container } = render(
//       <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
//         <OptimizelyPageMetrics trackPageView trackPageComplete />
//       </ContextWrap>,
//     );

//     await waitFor(() => {
//       expect(optimizely.track).toHaveBeenCalledTimes(1);
//     });
//     const element = container.getElementsByTagName('div')[0];
//     const observerInstance = getObserverInstance(element);

//     act(() => {
//       triggerIntersection({
//         changes: [{ isIntersecting: true }],
//         observer: observerInstance,
//       });
//     });

//     await Promise.resolve();

//     expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
//     expect(optimizely.track).toHaveBeenCalledTimes(2);
//   });

//   // reqrite - not sure this is a valid test
//   it('should do both things when component used in two places', async () => {
//     useOptimizelyVariation.mockReturnValue('variation_1');

//     const { container } = render(
//       <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
//         <main>
//           <OptimizelyPageMetrics trackPageComplete />
//         </main>
//         {/* pretty sure I'm not actually checking scroll depth */}
//         <OptimizelyPageMetrics trackPageView trackPageDepth />
//       </ContextWrap>,
//     );

//     await waitFor(() => {
//       expect(optimizely.track).toHaveBeenCalledTimes(1);
//     });
//     const element = container.getElementsByTagName('div')[0];
//     const observerInstance = getObserverInstance(element);

//     act(() => {
//       triggerIntersection({
//         changes: [{ isIntersecting: true }],
//         observer: observerInstance,
//       });
//     });

//     await Promise.resolve();

//     // is this ok?
//     expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
//     expect(optimizely.track).toHaveBeenCalledTimes(2);
//   });
// });
