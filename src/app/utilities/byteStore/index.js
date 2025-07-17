let totalBytes = 0;
const listeners = new Set();

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getSnapshot() {
  return totalBytes;
}

export function updateBytes(bytes) {
  totalBytes += bytes;
  listeners.forEach(listener => listener());
}
