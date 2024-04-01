import React from 'react';
import styled from '@emotion/styled';
import { Services } from '../../models/types/global';
import { OptimoBlock } from '../../models/types/optimo';

import RelatedContentSection from '.';
import {
  RelatedContentSingleItem,
  RelatedContentList,
  RelatedContentSingleItemRtl,
  RelatedContentListRtl,
} from './fixture';
import readme from './README.md';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

type Props = {
  content: OptimoBlock[];
  service?: Services;
};

// eslint-disable-next-line react/prop-types
const RelatedContentComponent = ({ content }: Props) => (
  <BackGround>
    <RelatedContentSection content={content} />
  </BackGround>
);

export default {
  title: 'components/OptimoPromos/OptimoRelatedContentArticlePage',
  RelatedContentComponent,
  parameters: {
    docs: { readme },
  },
};

export const ListRelatedContent = () => (
  <RelatedContentComponent content={RelatedContentList} />
);

export const ListRelatedContentRtl = () => (
  <RelatedContentComponent content={RelatedContentListRtl} />
);

export const SingleRelatedContent = () => (
  <RelatedContentComponent content={RelatedContentSingleItem} />
);

export const SingleRelatedContentRtl = () => (
  <RelatedContentComponent content={RelatedContentSingleItemRtl} />
);
