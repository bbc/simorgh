import { getActionCount, isExempt } from '.';

const complete = {
  uxAccessibilityDoc: {
    done: true,
  },
  acceptanceCriteria: {
    done: true,
  },
  swarm: {
    done: true,
  },
};

const oneOutstanding = {
  uxAccessibilityDoc: {
    done: true,
  },
  acceptanceCriteria: {
    done: true,
  },
  swarm: {
    done: false,
  },
};

const twoOutstanding = {
  uxAccessibilityDoc: {
    done: true,
  },
  acceptanceCriteria: {
    done: false,
  },
  swarm: {
    done: false,
  },
};

const threeOutstanding = {
  uxAccessibilityDoc: {
    done: false,
  },
  acceptanceCriteria: {
    done: false,
  },
  swarm: {
    done: false,
  },
};

describe('isExempt Health Factors utility', () => {
  it.each`
    testDescription         | context                          | expectedExempt
    ${'not exempted story'} | ${{ kind: 'do not exempt/any' }} | ${false}
    ${'exempted story'}     | ${{ kind: 'docs/exempt' }}       | ${true}
  `(`$testDescription`, ({ context, expectedExempt }) => {
    expect(isExempt(context)).toBe(expectedExempt);
  });
});

describe('getActionCount Health Factors utility', () => {
  it.each`
    testDescription                | metadata            | count
    ${'complete'}                  | ${complete}         | ${0}
    ${'one outstanding action'}    | ${oneOutstanding}   | ${1}
    ${'two outstanding actions'}   | ${twoOutstanding}   | ${2}
    ${'three outstanding actions'} | ${threeOutstanding} | ${3}
    ${'no metadata'}               | ${null}             | ${3}
  `(`$testDescription`, ({ metadata, count }) => {
    expect(getActionCount(metadata)).toBe(count);
  });
});
