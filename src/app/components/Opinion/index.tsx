import React from 'react';
import { TitleProps } from './types';

const Title = ({ text, link }: TitleProps) => (
  <>
    <a href={link}>{text}</a>
  </>
);

const OpinionPage = ({ title, quoteList }: OpinionPageProps) => {
  return (
    <div>
      <h1>Opinion</h1>
      <div id="opinions_panel">
        <div>Overall score: Support</div>
        <div>For Opinion</div>
        <div>Against Opinion</div>
      </div>
    </div>
  );
};

export default OpinionPage;
