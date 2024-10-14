import React, { ComponentProps, useContext, useId } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#app/contexts/RequestContext';

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

type Props = {
  className?: string;
  script?: Script;
};

export const LiteButton = ({
  children,
  className,
  script,
  ...htmlAttributes
}: Props & ComponentProps<'button'>) => {
  const { isLite } = useContext(RequestContext);
  const uniqueElId = useId();

  if (!isLite) return null;

  const elementId = `lite-button-${uniqueElId}`;

  return (
    <>
      {script && (
        <Helmet
          script={[
            {
              type: 'text/javascript',
              innerHTML: generateScript(script, elementId),
            },
          ]}
        />
      )}
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
