export const createAppendScriptByCode = (code) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode(code));
    document.body.append(script);
    resolve();
  });
};

export const createAppendScriptBySrc = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    // eslint-disable-next-line func-names
    script.onload = function () {
      resolve();
    };
    // eslint-disable-next-line func-names
    script.onerror = function () {
      reject();
    };
    document.body.append(script);
  });
};
