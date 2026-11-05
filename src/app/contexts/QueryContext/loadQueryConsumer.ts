import type { ComponentType } from 'react';

const loadQueryConsumer = <Props extends object>(
  consumerModule: Promise<{ default: ComponentType<Props> }>,
) =>
  Promise.all([
    import(
      /* webpackChunkName: "query_provider" */
      './index'
    ),
    consumerModule,
  ]).then(([{ withQueryProvider }, { default: Component }]) =>
    withQueryProvider(Component),
  );

export default loadQueryConsumer;
