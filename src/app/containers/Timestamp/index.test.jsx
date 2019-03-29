import React from 'react';
import { render } from 'enzyme';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import timestampGenerator from './helpers/timestampGenerator';
import Timestamp from '.';

const timestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const fifthJan = 1546707084472; // 2019-01-05T16:51:24.472Z
const eighthMarch = 1552009884472; // 2019-03-08T01:51:24.472Z

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

describe('Timestamp', () => {
  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
  });
  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp
      updated={noLeadingZeroTimestamp}
      published={noLeadingZeroTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp updated={timestamp} published={timestamp} />,
  );
  shouldMatchSnapshot(
    'should handle an invalid timestamp',
    <Timestamp updated={invalidTimestamp} published={invalidTimestamp} />,
  );

  it('should display only one timestamp when published === updated', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp updated={fifthJan} published={fifthJan} />,
    );
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper.length).toEqual(1);
  });

  it('should display a relative timestamp when updated < 10 hours ago', () => {
    const sixHoursAgo = timestampGenerator({ hours: 6 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp updated={sixHoursAgo} published={fifthJan} />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 6 hours ago');
  });

  it('should display an absolute timestamp when updated > 10 hours ago', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp updated={eighthMarch} published={fifthJan} />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 8 March 2019');
  });
});
