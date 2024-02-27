declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
  }
}

export {};
