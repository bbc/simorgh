import { NextPageContext } from 'next/types';
import addPlatformToRequestChainHeader from '#utilities/addPlatformToRequestChainHeader';

const addServiceChainHeader = ({
  ctx,
}: {
  ctx: Pick<NextPageContext, 'req' | 'res'>;
}) => {
  ctx.res?.setHeader(
    'req-svc-chain',
    addPlatformToRequestChainHeader({
      headers: ctx.req?.headers as unknown as Headers,
    }),
  );
};

export default addServiceChainHeader;
