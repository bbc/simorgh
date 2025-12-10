/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren, use } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../../Text';
import style from './index.styles';
import { LocalStorageContext } from '../../LocalStorageProvider';
import { RiddleContext } from '../../RiddleProvider';

const Option = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div css={style.optionContainer}>
      <Text>{title}</Text>
      {children}
    </div>
  );
};

export default () => {
  const { addCoins } = use(LocalStorageContext);
  const { forceTimeInc24: forceTimeInc, forceTimeDec24: forceTimeDec } =
    use(RiddleContext);

  return (
    <>
      <Text css={style.title} fontVariant="sansBold">
        Developer Tools
      </Text>
      <div css={style.container}>
        <Option title="Time Controls">
          <button type="button" onClick={() => forceTimeInc()}>
            +24h
          </button>
          <button type="button" onClick={() => forceTimeDec()}>
            -24h
          </button>
        </Option>
        <Option title="Credits">
          <button type="button" onClick={() => addCoins(700)}>
            +700
          </button>
        </Option>
      </div>
    </>
  );
};
