export type TitleProps = {
  text: string;
  canonicalUrl: string;
};

export type QuoteProps = {
  text: string;
  attribution: string;
  attributionLocation: string;
};

export type QuoteListProps = {
  connotation: string;
  quotes: QuoteProps[];
};

export type OpinionBlocks = {
  type: string;
  model: QuoteListProps | TitleProps;
};

export type OpinionPageProps = {
  blocks: OpinionBlocks[];
};
