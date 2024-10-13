import React, { ComponentProps } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuid } from 'uuid';

const generateScript = (script: () => void, elementId: string) => `
    window.addEventListener("load", function(event) {
      var button = document.getElementById('${elementId}');
      button.addEventListener('click', ${script});
    });
  `;

type Props = {
  className?: string;
  script?: () => void;
};

export const LiteButton = ({
  children,
  className,
  script,
  ...htmlAttributes
}: Props & ComponentProps<'button'>) => {
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
