import React from 'react';
import { render } from 'enzyme';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import timestampGenerator from './helpers/timestampGenerator';
import Timestamp from '.';

const timestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const eighthMarch = 1552009884472; // 2019-03-08T01:51:24.472Z
const eighthJan = 1546966284472; // 2019-01-08T16:51:24.472Z

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

  it('should display a published timestamp only when published === updated', () => {
    const renderedWrapper = render(
      <Timestamp updated={eighthJan} published={eighthJan} />,
    );
    expect(renderedWrapper.get(0).children[0].data).toEqual('8 January 2019');
    expect(renderedWrapper.length).toEqual(1);
  });

  it('should display a relative timestamp when updated < 10 hours ago', () => {
    const sixHoursAgo = timestampGenerator({ hours: 6 });
    const renderedWrapper = render(
      <Timestamp updated={sixHoursAgo} published={eighthJan} />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper.get(0).children[0].data).toEqual('8 January 2019');
    expect(renderedWrapper.get(1).children[0].data).toEqual('Updated');
    expect(renderedWrapper.get(1).children[1].children[0].data).toEqual(
      '6 hours ago',
    );
  });

  it('should display an absolute timestamp when updated > 10 hours ago', () => {
    const renderedWrapper = render(
      <Timestamp updated={eighthMarch} published={eighthJan} />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper.get(0).children[0].data).toEqual('8 January 2019');
    expect(renderedWrapper.get(1).children[0].data).toEqual('Updated');
    expect(renderedWrapper.get(1).children[1].children[0].data).toEqual(
      '8 March 2019',
    );
  });
});
