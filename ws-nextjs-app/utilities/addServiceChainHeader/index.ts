import addPlatformToRequestChainHeader from '#src/server/utilities/addPlatformToRequestChainHeader';
import { NextPageContext } from 'next/types';

const addServiceChainHeader = ({ ctx }: { ctx: NextPageContext }) => {
  ctx.res?.setHeader(
    'req-svc-chain',
    addPlatformToRequestChainHeader({
      headers: ctx.req?.headers as unknown as Headers,
    }),
  );
};

export default addServiceChainHeader;
