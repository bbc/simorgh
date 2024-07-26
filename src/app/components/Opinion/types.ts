export type TitleProps = {
  text: string;
  link: string;
};

export type QuoteProps = {
  text: string;
  attribution: string;
  attributionLocation: string;
};

export type QuoteList = {
  connotation: string;
  quotes: QuoteProps[];
};

export type OpinionBlocks = {
  type: string;
  model: QuoteList | TitleProps;
};

export type OpinionPageProps = {
  blocks: OpinionBlocks[];
};
