import React from 'react';
import InlineLink from '#psammead/psammead-inline-link/src';
import Paragraph from '#psammead/psammead-paragraph/src';
import idSanitiser from '#lib/utilities/idSanitiser';
import Grid, { GelPageGrid } from '#components/Grid';

const ErrorMain = ({
  statusCode,
  title,
  message,
  solutions,
  callToActionFirst = null,
  callToActionLinkText,
  callToActionLinkUrl,
  callToActionLast = null,
  script,
  service,
}) => (
  <div className="w-full pb-16 group-4:mx-auto group-4:max-w-[1008px] group-5:mx-auto group-5:max-w-[1280px]">
    <main
      role="main"
      className="grid grid-cols-6 gap-4 group-4:grid-cols-8 group-5:grid-cols-20 px-4 group-4:px-8"
    >
      <div className="col-span-6 col-start-1 group-4:col-span-6 group-4:col-start-2 group-5:col-span-12 group-5:col-start-5 px-4 group-1:px-4 group-2:px-4 group-3:px-4">
        <span
          className="text-paragon text-postbox block font-reith-sans font-semibold pt-10 pb-2"
          data-e2e="status-code"
        >
          {statusCode}
        </span>
        <h1
          id="content"
          className="text-canon text-shadow mt-0 font-serif-medium"
          tabIndex="-1"
        >
          {title}
        </h1>
        <div className="pt-1">
          <Paragraph script={script} service={service}>
            {message}
          </Paragraph>
        </div>
        <ul>
          {solutions.map(text => (
            <li key={idSanitiser(text)} className="pt-1">
              <Paragraph script={script} service={service}>
                {text}
              </Paragraph>
            </li>
          ))}
        </ul>
        <div className="pt-1">
          <Paragraph script={script} service={service}>
            {callToActionFirst}
            <InlineLink
              href={callToActionLinkUrl}
              className="focusIndicatorReducedWidth"
            >
              {callToActionLinkText}
            </InlineLink>
            {callToActionLast}
          </Paragraph>
        </div>
      </div>
    </main>
  </div>
);

export default ErrorMain;
