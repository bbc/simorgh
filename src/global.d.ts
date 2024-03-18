declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
    dotcom: {
      ads: {
        getAdTag: () => string;
      };
      bootstrap: () => void;
      cmd: { push: () => void };
    };
  }
}

export {};
