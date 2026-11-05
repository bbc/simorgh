import { createElement, type ComponentType } from 'react';

const loadQueryConsumer = <Props extends object>(
  consumerModule: Promise<{ default: ComponentType<Props> }>,
) =>
  Promise.all([
    import(
      /* webpackChunkName: "query_provider" */
      './index'
    ),
    consumerModule,
  ]).then(
    ([{ default: QueryProvider }, { default: Component }]) =>
      function QueryConsumer(props: Props) {
        return <QueryProvider>{createElement(Component, props)}</QueryProvider>;
      },
  );

export default loadQueryConsumer;
