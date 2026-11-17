import { FollowAction, UASAction } from '#app/models/types/action';
import type { ActionTooltipStatus } from '.';

const SUCCESS_ACTIONS = new Set<UASAction | FollowAction>([
  UASAction.SAVE,
  FollowAction.FOLLOW,
]);

export type ActionResult = {
  status: 'success' | 'error';
  action: UASAction | FollowAction;
};

const getActionTooltipStatus = (
  actionResult: ActionResult,
): ActionTooltipStatus => {
  if (actionResult.status === 'error') return 'error';
  return SUCCESS_ACTIONS.has(actionResult.action) ? 'success' : 'removed';
};

export default getActionTooltipStatus;
