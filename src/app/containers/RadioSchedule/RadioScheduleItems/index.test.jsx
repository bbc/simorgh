import React from 'react';
import { render } from '@testing-library/react';
import RadioScheduleItems from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';

const schedule = [
  {
    id: 'p086pmsd',
    state: 'next',
    startTime: 1893488400000,
    link: '/arabic/bbc_arabic_radio/w172x9qcpbyd2h1',
    brandTitle: 'العالم هذا الصباح',
    summary:
      'الفترة الإخبارية الرئيسية كل صباح على مدى أربع ساعات وتتناول أهم الأخبار والموضوعات الأقليمية والدولية بالتغطية والتحليل.',
    duration: 'PT1H30M30S',
  },
  {
    id: 'p086pjpz',
    state: 'onDemand',
    startTime: 1585191540000,
    link: '/arabic/bbc_arabic_radio/w172x9qcpbyctzs',
    brandTitle: 'العالم هذا الصباح',
    summary:
      'الفترة الإخبارية الرئيسية كل صباح على مدى أربع ساعات وتتناول أهم الأخبار والموضوعات الأقليمية والدولية بالتغطية والتحليل.',
    duration: 'PT2H',
  },
  {
    id: 'p086pjpx',
    state: 'onDemand',
    startTime: 1585189800000,
    link: '/arabic/bbc_arabic_radio/w172xbf7kbvtt4h',
    brandTitle: 'موجز الأنباء',
    summary: 'نشرة موجزة في دقيقتين لأهم الأنباء الأقليمية والدولية',
    duration: 'PT2M',
  },
  {
    id: 'p086pjpp',
    state: 'onDemand',
    startTime: 1585188000000,
    link: '/arabic/bbc_arabic_radio/w172xbdf3m84fx2',
    brandTitle: 'نشرة الأخبار',
    summary:
      'نشرة اخبارية على رأس الساعة تركز على أهم أخبار المنطقة والعالم وتتضمن تصريحات المسؤولين وإفادات مراسلينا',
    duration: 'PT6M',
  },
];

/* eslint-disable react/prop-types */
const RadioScheduleWithContext = ({ linkComponent, linkComponentAttr }) => (
  <RequestContextProvider
    isAmp={false}
    pageType={FRONT_PAGE}
    service="arabic"
    pathname="/arabic"
    timeOnServer={Date.now()}
  >
    <ServiceContextProvider service="arabic">
      <RadioScheduleItems
        schedule={schedule}
        linkComponent={linkComponent}
        linkComponentAttr={linkComponentAttr}
        durationLabel="Duration"
      />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('RadioScheduleItems', () => {
  it('contains four programs for a service with a radio schedule', async () => {
    const { container } = render(<RadioScheduleWithContext />);
    expect(container.querySelectorAll('li').length).toEqual(4);
  });

  it('should render with default a tag when linkComponent prop is not provided', async () => {
    const { container } = render(<RadioScheduleWithContext />);
    expect(container.getElementsByTagName('a')[0].getAttribute('href')).toEqual(
      '/arabic/bbc_arabic_radio/w172x9qcpbyctzs',
    );
  });

  it('should render with passed linkComponent when provided', async () => {
    const { container } = render(
      <RadioScheduleWithContext linkComponent="aside" linkComponentAttr="to" />,
    );
    expect(
      container.getElementsByTagName('aside')[1].getAttribute('to'),
    ).toEqual('/arabic/bbc_arabic_radio/w172xbf7kbvtt4h');
  });
});
