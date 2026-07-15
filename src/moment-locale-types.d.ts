// TypeScript 6 (TS2882) requires type declarations for side-effect imports of
// module subpaths. Moment locale files are imported purely for their side effects
// (registering locale data) and have no exports, so we declare them here.
declare module 'moment/locale/*';
