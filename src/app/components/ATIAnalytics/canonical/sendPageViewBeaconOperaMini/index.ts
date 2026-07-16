type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

export default (
  atiPageViewUrlString: string,
  isOperaProxyFn: () => boolean,
) => {
  if (isOperaProxyFn() && !(window as OperaMiniWindow).hasOperaMiniScriptRan) {
    (window as OperaMiniWindow).hasOperaMiniScriptRan = true;

    const atiPageViewUrl = `${atiPageViewUrlString}${
      document.referrer ? `&ref=${document.referrer}` : ''
    }`;

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
