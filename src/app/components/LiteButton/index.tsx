import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuid } from 'uuid';

const generateScript = (script: string, elementId: string) => {
  return `
    window.addEventListener("load", function(event) {
      var button = document.getElementById('${elementId}');
      button.addEventListener('click', function() {${script}});
    });
  `;
};

type Props = {
  className?: string;
  script?: string;
};

export const LiteButton = ({
  children,
  className,
  script,
  ...htmlAttributes
}: Props & React.ComponentProps<'button'>) => {
  const elementId = `lite-button-${uuid()}`;

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
