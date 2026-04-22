## Props

| Argument       |          Type          | Required | Description                                                       |
| :------------- | :--------------------: | :------: | :---------------------------------------------------------------- |
| `participants` | Array of `Participant` |   yes    | The participants in the order they appear in the the head to head |
| `date`         |    Object of `Date`    |   yes    | Date elements to identify when the event takes place              |
| `status`       |          Enum          |   yes    | The status of the event. `PreEvent`, `MidEvent` or `PostEvent`    |
| `comment`      |  Object of `Comment`   |    no    | A comment to provide additional context for the event             |

### Object types

#### Date

| Key          |  Type  | Required | Description                                       |
| :----------- | :----: | :------: | :------------------------------------------------ |
| `time`       | String |   yes    | Time of the event in 24h format                   |
| `iso`        | String |   yes    | Machine readable ISO datetime string              |
| `dayOfWeek`  | String |    no    | The day of week to show in the stacked variant    |
| `day`        | String |    no    | The numerical date to show in the stacked variant |
| `shortMonth` | String |    no    | The month to show in the stacked variant          |

#### Participant

| Key     |  Type  | Required | Description                                                                        |
| :------ | :----: | :------: | :--------------------------------------------------------------------------------- |
| `id`    | String |   yes    | Used to identify badges                                                            |
| `name`  | String |   yes    | Name of the participant                                                            |
| `score` | Number |    no    | Score for the participant, used in a `MidEvent` or `PostEvent` status head to head |

#### Comment

| Key              |  Type  | Required | Description                                  |
| :--------------- | :----: | :------: | :------------------------------------------- |
| `text`           | String |   yes    | The text that is presented visually          |
| `accessibleText` | String |    no    | Text that is used for assistive technologies |

## Usage

To be used within content displaying event information between 2 participants such as Sport Data pages, Live pages and Topic pages for example.

## Capabilities

- A badge can be rendered for a participant using their provided ID. (Currently only supports basketball badges).
- Mid event styling is configurable through the `Live` (background) and `Accent contrast` (foreground) brand colours
- Post event styling is configurable through the `Masthead` (background) and `Masthead contrast` (foreground) brand colours
- A comment can be rendered with an accessible alternative to ensure the quality of the experience for users with assistive technology, when using acronyms or abbreviations in the visual text for example

### Example

**Pre event**

```jsx
import React from 'react';
import HeadToHeadV2 from '@bbc/web-components/head-to-head-v2';

const figure = () => (
  <HeadToHeadV2
    status="PreEvent"
    leftParticipant={{ id: 'TFBB632', name: 'Argentina' }}
    rightParticipant={{ id: 'TFBB1264', name: 'Saudi Arabia' }}
    date={{ time: '18:00', iso: '2022-11-22T18:00:00.000Z' }}
  />
);
```

**Mid event**

```jsx
import React from 'react';
import HeadToHeadV2 from '@bbc/web-components/head-to-head-v2';

const figure = () => (
  <HeadToHeadV2
    status="MidEvent"
    leftParticipant={{ id: 'TFBB3', name: 'Arsenal', score: 1 }}
    rightParticipant={{
      id: 'TFBB36',
      name: 'Brighton & Hove Albion',
      score: 3,
    }}
    date={{ time: '14:00', iso: '2022-11-09T14:00:00.000Z' }}
  />
);
```

**Post event**

```jsx
import React from 'react';
import HeadToHeadV2 from '@bbc/web-components/head-to-head-v2';

const figure = () => (
  <HeadToHeadV2
    status="PostEvent"
    leftParticipant={{ id: 'TFBB4', name: 'Newcastle United', score: 0 }}
    rightParticipant={{ id: 'TFBB31', name: 'Crystal Palace', score: 0 }}
    date={{ time: '18:00', iso: '2022-11-09T18:00:00.000Z' }}
  />
);
```

## Accessibility notes

- Badge images are decorative only.
- Accessible text announced by screen readers can be changed from `... at {period}` to `... on the {period}` by setting `periodLabel.labelType` to `'date'`
  - This should be set when passing a date (e.g., `1st of January 2023`) to `periodLabel.accessible` to give an improved screen reader experience
