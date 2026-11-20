import { createElement, type ComponentType } from 'react';
import nodeLogger from '#lib/logger.node';
import { CLIENT_COMPONENT_RENDER_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const loadQueryConsumer = <Props extends object>(
  consumerModule: Promise<{ default: ComponentType<Props> }>,
) =>
  Promise.all([
    import(
      /* webpackChunkName: "query_provider" */
      './index'
    ),
    consumerModule,
  ])
    .then(
      ([{ default: QueryProvider }, { default: Component }]) =>
        function QueryConsumer(props: Props) {
          return (
            <QueryProvider>{createElement(Component, props)}</QueryProvider>
          );
        },
    )
    .catch((error: unknown) => {
      logger.error(CLIENT_COMPONENT_RENDER_ERROR, {
        componentName: 'QueryConsumer',
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    });

export default loadQueryConsumer;
