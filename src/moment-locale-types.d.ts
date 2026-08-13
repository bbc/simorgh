// TypeScript 6 (TS2882) requires type declarations for side-effect imports of
// module subpaths. These modules are imported purely for their side effects
// (registering locale/timezone data) and have no exports.
declare module 'moment/locale/*';
declare module '#psammead/moment-timezone-include/tz/*';
declare module '#psammead/psammead-locales/moment/*';
