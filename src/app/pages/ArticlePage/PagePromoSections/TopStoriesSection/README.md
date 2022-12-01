import { Source, ArgsTable } from '@storybook/addon-docs';
import dedent from 'ts-dedent';
import Component from '.';

## Description

A component constructing the Top Stories section for Article pages. The sections can hold a list of TopStoriesItem or a single TopStoriesItem. The section can have a max of 3 items.

## Props

| Name    | type             | Description                                      |
| ------- | ---------------- | ------------------------------------------------ |
| content | array of objects | Top Stories array found in secondary column data |

## Example ltr/rtl

<Source
  language="jsx"
  dark
  type="code"
  code={dedent`
    const contentExample = [
                    {
                     headlines: {headline: "headline1"},
                     timestamp: 123456789,
                     ...
                    },
                    {
                     headlines: {headline: "headline2"},
                     timestamp: 123456789,
                     ...
                    },
                    {
                     headlines: {headline: "headline3"},
                     timestamp: 123456789,
                     ...
                    },
                    ...
                ]

<TopStoriesSection content={contentExample} />
`} />
