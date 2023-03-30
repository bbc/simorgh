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

```tsx
<TopStoriesSection content={contentExample} />
```
