import {useCallback} from 'react';
import {useAppContext} from './AppContext';
import {ActionTypes} from './AppReducer';

export function useAppContextState() {
  return useAppContext().state;
}

export function useAppContextDispatchAction() {
  return useAppContext().dispatchAction;
}

export function useAppContextDispatch() {
  return useAppContext().dispatch;
}

export function useLoader(): {
  loading?: boolean;
  showLoader: (u: boolean) => any;
} {
  const dispatchAction = useAppContextDispatchAction();
  const loading = useAppContextState().loading;
  const showLoader = useCallback(
    (u: boolean) => dispatchAction({payload: u, type: ActionTypes.Loading}),
    [dispatchAction],
  );
  return {loading, showLoader};
}
