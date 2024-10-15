import React, { ComponentProps, useId } from 'react';
import { Helmet } from 'react-helmet';

type Script = string | (() => void);

const generateScript = (script: Script, elementId: string) => {
  if (typeof script === 'string') {
    return `
      window.addEventListener("load", function(event) {
        var button = document.getElementById('${elementId}');
        button.addEventListener('click', function() {${script}});
      });
    `;
  }

  return `
    window.addEventListener("load", function(event) {
      var button = document.getElementById('${elementId}');
      button.addEventListener('click', ${script});
    });
  `;
};

export const LiteButton = ({
  children,
  className,
  script,
  ...htmlAttributes
}: { script: Script } & ComponentProps<'button'>) => {
  const elementId = `lite-button-${useId()}`;

  return (
    <>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: generateScript(script, elementId),
          },
        ]}
      />
      <button
        type="button"
        id={elementId}
        className={className}
        {...htmlAttributes}
      >
        {children}
      </button>
    </>
  );
};

export default LiteButton;
