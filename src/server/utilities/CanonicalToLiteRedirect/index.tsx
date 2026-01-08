export const redirectScript = (window: Window) => {
  const { pathname } = window.location;

  const isOptedIntoLiteRedirect =
    window.localStorage.isOptedIntoLiteRedirect ?? 'true';

  if (window?.navigator?.connection?.effectiveType) {
    const toLitePath = `${pathname}.lite`;
    const ect = window.navigator.connection.effectiveType;
    const normalisedEct = ect.toLocaleLowerCase();

    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
        if (isOptedIntoLiteRedirect === 'true') {
          window.localStorage.setItem('isOptedIntoLiteRedirect', 'true');
          window.location.replace(toLitePath);
        }
        break;
      default:
        break;
    }
  }
};

export const optOutScript = (window: Window) => {
  window.localStorage.setItem('isOptedIntoLiteRedirect', 'false');
};

export const OptOutOfLiteRedirect = () => {
  return (
    <script>
      {`
      window.addEventListener('DOMContentLoaded', () => {
        document
            .getElementById('go-back-to-canonical-link')
            .addEventListener('click', (event) => {
                          (${optOutScript.toString()})(window)
                        });
        });
      `}
    </script>
  );
};

// THIS COMPONENT IS ONLY TO BE USED WITH CANONICAL RENDERERS
// DO NOT USE IT WITH LITE AND AMP RENDERERS
export default () => {
  return (
    <script>
      {`
        window.addEventListener('DOMContentLoaded', () => {
          (${redirectScript.toString()})(window)
        })
      `}
    </script>
  );
};
