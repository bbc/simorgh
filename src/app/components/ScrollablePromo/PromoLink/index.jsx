import React, { useContext } from 'react';
import { object } from 'prop-types';
import styled from '@emotion/styled';
import { pathOr } from 'ramda';

import { getPica } from '@bbc/gel-foundations/dist/typography';
import { getSerifBold } from '@bbc/psammead-styles/dist/font-styles';
import { C_GREY_6 } from '@bbc/psammead-styles/dist/colours';

import { ServiceContext } from '#contexts/ServiceContext';
import filterForBlockType from '#lib/utilities/blockHandlers';

const C_GREY_8 = '#202224';

const Link = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSerifBold(service)};
  width: 100%;

  text-overflow: ellipsis;
  text-decoration: none;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  color: ${C_GREY_8};
  &:visited {
    color: ${C_GREY_6};
  }
`;

const PromoLink = ({ block }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const textBlock = filterForBlockType(
    pathOr({}, ['model', 'blocks'], block),
    'text',
  );
  const href = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
    textBlock,
  );
  const title = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
    textBlock,
  );
  return (
    <Link href={href} service={service} script={script} dir={dir}>
      {title}
    </Link>
  );
};

PromoLink.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  block: object.isRequired,
};

export default PromoLink;
