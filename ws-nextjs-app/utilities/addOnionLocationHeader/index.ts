import { NextPageContext } from 'next/types';

const addOnionLocationHeader = ({ ctx }: { ctx: NextPageContext }) => {
  const { asPath } = ctx;

  ctx.res?.setHeader(
    'onion-location',
    `https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion${asPath}`,
  );
};

export default addOnionLocationHeader;
