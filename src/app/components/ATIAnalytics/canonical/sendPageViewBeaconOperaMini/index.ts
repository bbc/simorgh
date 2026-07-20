type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

export default (
  atiPageViewUrlString: string,
  isOperaProxyFn: () => boolean,
) => {
  const operaMiniWindow = window as OperaMiniWindow;
  // eslint-disable-next-line no-extra-boolean-cast
  if (isOperaProxyFn() && !Boolean(operaMiniWindow.hasOperaMiniScriptRan)) {
    (window as OperaMiniWindow).hasOperaMiniScriptRan = true;

    const atiPageViewUrl = `${atiPageViewUrlString}${
      document.referrer ? `&ref=${document.referrer}` : ''
    }`;

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
