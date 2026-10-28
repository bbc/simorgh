import type { ActionTooltipStatus } from '.';

type ActionResult<TAction> = {
  status: 'success' | 'error';
  action: TAction;
};

const getActionTooltipStatus = <TAction>(
  actionResult: ActionResult<TAction>,
  successAction: TAction,
): ActionTooltipStatus => {
  if (actionResult.status === 'error') return 'error';
  return actionResult.action === successAction ? 'success' : 'removed';
};

export default getActionTooltipStatus;
