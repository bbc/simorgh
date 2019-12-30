/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import MostReadList from './List';
import MostReadTitle from './Title';
import { MostReadLink, MostReadRank } from './Item';
import MostRead from './index';
import { getItem, getItems } from './testHelpers/itemsHelper';

const arabicServiceDecorator = withServicesKnob({
  defaultService: 'arabic',
});

const bengaliServiceDecorator = withServicesKnob({
  defaultService: 'bengali',
});

const burmeseServiceDecorator = withServicesKnob({
  defaultService: 'burmese',
});

const newsServiceDecorator = withServicesKnob({
  defaultService: 'news',
});

const renderMostReadTitle = ({ header, service, script, dir }) => (
  <MostReadTitle header={header} script={script} service={service} dir={dir} />
);

const renderMostRead = ({ service, script, dir, header }) => (
  <MostRead
    items={getItems(service, 10)}
    service={service}
    script={script}
    dir={dir}
    header={header}
  />
);

const renderList = ({ service, script }, number, type) => (
  <MostReadList
    items={getItems(service, number)}
    service={service}
    script={script}
    dir={type === 'LTR' ? 'ltr' : 'rtl'}
  />
);

const renderRank = ({ service, script, rank }) => (
  <MostReadRank service={service} script={script}>
    {rank}
  </MostReadRank>
);

storiesOf('Components|MostRead/Item', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(`MostReadLink`, ({ script, service }) => (
    <MostReadLink item={getItem(service)} service={service} script={script} />
  ))
  .add(`MostReadLink with last updated date`, ({ script, service }) => (
    <MostReadLink
      item={getItem(service, true)}
      service={service}
      script={script}
    />
  ));

storiesOf('Components|MostRead/Rank', module)
  .addDecorator(withKnobs)
  .add(`MostReadRank LTR`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderRank({ service, script, rank: 5 }),
    ),
  )
  .add(`MostReadRank LTR double digits`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderRank({ service, script, rank: 10 }),
    ),
  )
  .add(`MostReadRank RTL`, () =>
    arabicServiceDecorator(({ script, service }) =>
      renderRank({ service, script, rank: '۲' }),
    ),
  );

storiesOf('Components|MostRead/List', module)
  .addDecorator(withKnobs)
  .add(`News LTR`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`News LTR 5 items`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  )
  .add(`Bengali LTR`, () =>
    bengaliServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`Bengali LTR 5 items`, () =>
    bengaliServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  )
  .add(`Burmese LTR`, () =>
    burmeseServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`Burmese LTR 5 items`, () =>
    burmeseServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  );

storiesOf('Components|MostRead/List/RTL', module)
  .addDecorator(withKnobs)
  .add(`Arabic RTL`, () =>
    arabicServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'RTL'),
    ),
  )
  .add(`Arabic RTL 5 items`, () =>
    arabicServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'RTL'),
    ),
  );

storiesOf('Components|MostRead/Title', module)
  .addDecorator(withKnobs)
  .add('LTR', () =>
    newsServiceDecorator(({ script, service, dir }) =>
      renderMostReadTitle({ service, dir, script, header: 'Most Read' }),
    ),
  )
  .add('RTL', () =>
    arabicServiceDecorator(({ script, service, dir }) =>
      renderMostReadTitle({ service, dir, script, header: 'الأكثر قراءة' }),
    ),
  );

storiesOf('Components|MostRead', module)
  .addDecorator(withKnobs)
  .add('default LTR', () =>
    newsServiceDecorator(({ script, service, dir }) =>
      renderMostRead({ script, service, dir, header: 'Most Read' }),
    ),
  )
  .add('default RTL', () =>
    arabicServiceDecorator(({ script, service, dir }) =>
      renderMostRead({ script, service, dir, header: 'الأكثر قراءة' }),
    ),
  );
