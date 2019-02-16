import immer, { Draft } from 'immer';
import { get, mapValues } from 'lodash';
import { Action } from 'redux';

import { AnyRsaaActionSet, ExtractFailureAction, ExtractRequestAction, ExtractSuccessAction, RsaaActionType } from './kracf';

export type KeyableRequestReducerMethod<
  State,
  RequestAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractRequestAction<RequestAction>
) => void | State;

export type KeyableSuccessReducerMethod<
  State,
  SuccessAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractSuccessAction<SuccessAction>
) => void | State;

export type KeyableFailureReducerMethod<
  State,
  FailureAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractFailureAction<FailureAction>
) => void | State;

export interface KeyableRequestReducer<
  State,
  RequestAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_REQUEST;
  endpoint: RequestAction['meta']['endpoint'];
  method: RequestAction['meta']['method'];
  reducer: KeyableRequestReducerMethod<State, RequestAction>;
}

export interface KeyableSuccessReducer<
  State,
  SuccessAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_SUCCESS;
  endpoint: SuccessAction['meta']['endpoint'];
  method: SuccessAction['meta']['method'];
  reducer: KeyableSuccessReducerMethod<State, SuccessAction>;
}

export interface KeyableFailureReducer<
  State,
  FailureAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_FAILURE;
  endpoint: FailureAction['meta']['endpoint'];
  method: FailureAction['meta']['method'];
  reducer: KeyableFailureReducerMethod<State, FailureAction>;
}

export type KeyableRsaaReducer<
  State,
  RsaaAction extends AnyRsaaActionSet = any
> =
  | KeyableRequestReducer<State, RsaaAction>
  | KeyableSuccessReducer<State, RsaaAction>
  | KeyableFailureReducer<State, RsaaAction>;

export const createKeyableRequestReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableRequestReducerMethod<State, ReducerAction>
): KeyableRequestReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_REQUEST
});

export const createKeyableSuccessReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableSuccessReducerMethod<State, ReducerAction>
): KeyableSuccessReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_SUCCESS
});

export const createKeyableFailureReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableFailureReducerMethod<State, ReducerAction>
): KeyableFailureReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_FAILURE
});

export const combineKeyableRsaaReducers = <State = never>(
  defaultState: State
) => (...keyableReducers: Array<KeyableRsaaReducer<State>>) => (
  baseState: State = defaultState,
  action: Action
): State => {
  let newState: State = baseState;
  mapValues(keyableReducers, (reducer: KeyableRsaaReducer<State>) => {
    if (
      reducer.type === action.type &&
      reducer.endpoint === get(action, 'meta.endpoint') &&
      reducer.method === get(action, 'meta.method')
    ) {
      // tslint:disable-next-line:no-object-literal-type-assertion
      newState = {
        ...((immer<State, void | State>(baseState, state => {
          return (reducer.reducer as any)(state, action);
        }) || {}) as object)
      } as State;
      return true;
    }
  });
  return newState;
};
