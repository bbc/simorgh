type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

export default (
  atiPageViewUrlString: string,
  isOperaProxyFn: () => boolean,
) => {
  const operaMiniWindow = window as OperaMiniWindow;

  if (isOperaProxyFn() && !operaMiniWindow.hasOperaMiniScriptRan) {
    operaMiniWindow.hasOperaMiniScriptRan = true;

    const atiPageViewUrl = `${atiPageViewUrlString}${
      document.referrer ? `&ref=${document.referrer}` : ''
    }`;

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
