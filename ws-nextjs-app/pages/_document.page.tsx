import Document, { DocumentContext } from 'next/document';

import React, { HTMLAttributes, ReactElement } from 'react';
import { Helmet, HelmetData } from 'react-helmet';

import isAppPath from '#app/routes/utils/isAppPath';
import isLitePath from '#app/routes/utils/isLitePath';
import {
  EnvConfig,
  getProcessEnvAppVariables,
} from '#lib/utilities/getEnvConfig';
import CanonicalRenderer from '../Renderers/CanonicalRenderer';
import LiteRenderer from '../Renderers/LiteRenderer';

type DocProps = {
  clientSideEnvVariables: EnvConfig;
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  title: ReactElement;
  helmet: HelmetData;
  isApp: boolean;
  isLite: boolean;
};

export default class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const url = ctx.asPath || '';
    const isApp = isAppPath(url);
    const isLite = isLitePath(url);

    const initialProps = await Document.getInitialProps(ctx);

    // Read env variables from the server and expose them to the client
    const clientSideEnvVariables = getProcessEnvAppVariables();

    return {
      ...initialProps,
      clientSideEnvVariables,
      helmet: Helmet.renderStatic(),
      isApp,
      isLite,
    };
  }

  render() {
    const { clientSideEnvVariables, helmet, isApp, isLite } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const title = helmet.title.toComponent();
    const helmetMetaTags = helmet.meta.toComponent();
    const helmetLinkTags = helmet.link.toComponent();
    const helmetScriptTags = helmet.script.toComponent();

    switch (true) {
      case isLite:
        return (
          <LiteRenderer
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            title={title}
          />
        );
      default:
        return (
          <CanonicalRenderer
            clientSideEnvVariables={clientSideEnvVariables}
            helmetLinkTags={helmetLinkTags}
            helmetMetaTags={helmetMetaTags}
            helmetScriptTags={helmetScriptTags}
            htmlAttrs={htmlAttrs}
            isApp={isApp}
            title={title}
          />
        );
    }
  }
}
