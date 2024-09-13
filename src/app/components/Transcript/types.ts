export type TranscriptItem = {
  id: string;
  start: string;
  content: string;
};

export type TranscriptBlock = {
  id: string;
  type: string;
  model: {
    language: string;
    blocks: TranscriptItem[];
  };
};
