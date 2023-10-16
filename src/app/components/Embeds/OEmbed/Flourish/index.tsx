/** @jsx jsx */
/* eslint-disable camelcase */
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import React from 'react';
import { OEmbedProps } from '../types';
import styles from './index.styles';

const Flourish = ({ oembed }: OEmbedProps) => {
  const { html, width, height } = oembed;
  const iframeSrc = html.match(/(?<=src=").*?(?=[?"])/)?.[0];
  const script =
    "window.addEventListener('message', function (event) {  var message = typeof event.data === 'string' && JSON.parse(event.data);  if ((message === null || message === void 0 ? void 0 : message.sender) === 'Flourish' && (message === null || message === void 0 ? void 0 : message.context) === 'iframe.resize') {    document.getElementById(`test-flourish`).style.height = message.height + 'px';  }});";

  return (
    <React.Fragment>
      <Helmet>
        <script>{script}</script>
      </Helmet>
      <iframe
        css={styles.iframe}
        src={`${iframeSrc}?auto=1`}
        id="test-flourish"
        frameBorder="0"
        scrolling="no"
        height={height}
        width={width}
        title="Interactive or visual content"
      />
    </React.Fragment>
  );
};

export default Flourish;
