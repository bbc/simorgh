import React from 'react';
import { render } from 'enzyme';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
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
      lastPublished={noLeadingZeroTimestamp}
      firstPublished={noLeadingZeroTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp lastPublished={timestamp} firstPublished={timestamp} />,
  );
  shouldMatchSnapshot(
    'should handle an invalid timestamp',
    <Timestamp
      lastPublished={invalidTimestamp}
      firstPublished={invalidTimestamp}
    />,
  );

  it('should display both a published & updated timestamp when firstPublished !== lastPublished', () => {
    const renderedWrapper = render(
      <Timestamp lastPublished={eighthJan} firstPublished={eighthMarch} />,
    );
    expect(renderedWrapper.get(0).children[0].data).toEqual('8 March 2019');
  });

  it('should display both a published & updated timestamp when firstPublished === lastPublished', () => {
    const renderedWrapper = render(
      <Timestamp lastPublished={eighthJan} firstPublished={eighthJan} />,
    );
    expect(renderedWrapper.get(0).children[0].data).toEqual('8 January 2019');
  });
});
