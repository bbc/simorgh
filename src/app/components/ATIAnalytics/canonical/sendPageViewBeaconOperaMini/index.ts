import isOperaProxy from '#app/lib/utilities/isOperaProxy';

type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

export default (atiPageViewUrlString: string) => {
  const operaMiniWindow = window as OperaMiniWindow;

  if (isOperaProxy() && !operaMiniWindow.hasOperaMiniScriptRan) {
    operaMiniWindow.hasOperaMiniScriptRan = true;

    const atiPageViewUrl = `${atiPageViewUrlString}${
      document.referrer ? `&ref=${document.referrer}` : ''
    }`;

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
