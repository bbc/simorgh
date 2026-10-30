import { FollowAction, UASAction } from '#app/models/types/action';
import getActionTooltipStatus from './getActionTooltipStatus';

describe('getActionTooltipStatus', () => {
  it.each([
    {
      status: 'success',
      action: FollowAction.FOLLOW,
      expectedStatus: 'success',
    },
    { status: 'success', action: UASAction.SAVE, expectedStatus: 'success' },
    {
      status: 'success',
      action: FollowAction.UNFOLLOW,
      expectedStatus: 'removed',
    },
    { status: 'success', action: UASAction.REMOVE, expectedStatus: 'removed' },
    { status: 'error', action: FollowAction.FOLLOW, expectedStatus: 'error' },
  ] as const)(
    'returns $expectedStatus for a $status $action action',
    ({ status, action, expectedStatus }) => {
      expect(getActionTooltipStatus({ status, action })).toBe(expectedStatus);
    },
  );
});
