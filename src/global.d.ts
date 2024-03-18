declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
    dotcom: {
      ads: {
        getAdTag: () => string;
        resolves: { enabled: Promise[]; getAdTag: Promise[] };
      };
      bootstrap: () => void;
      cmd: { push: () => void };
    };
  }
}

export {};
