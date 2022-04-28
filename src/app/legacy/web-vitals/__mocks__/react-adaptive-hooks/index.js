const useNetworkStatus = () => {
  return { effectiveConnectionType: '4g' };
};

const useMemoryStatus = () => {
  return { deviceMemory: 3 };
};

const useHardwareConcurrency = () => {
  return { numberOfLogicalProcessors: 4 };
};

export { useNetworkStatus, useHardwareConcurrency, useMemoryStatus };
