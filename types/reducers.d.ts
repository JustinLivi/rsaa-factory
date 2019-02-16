import { Draft } from 'immer';
import { Action } from 'redux';
import { AnyRsaaActionSet, ExtractFailureAction, ExtractRequestAction, ExtractSuccessAction, RsaaActionType } from './kracf';
export declare type KeyableRequestReducerMethod<State, RequestAction extends AnyRsaaActionSet> = (state: Draft<State>, action: ExtractRequestAction<RequestAction>) => void | State;
export declare type KeyableSuccessReducerMethod<State, SuccessAction extends AnyRsaaActionSet> = (state: Draft<State>, action: ExtractSuccessAction<SuccessAction>) => void | State;
export declare type KeyableFailureReducerMethod<State, FailureAction extends AnyRsaaActionSet> = (state: Draft<State>, action: ExtractFailureAction<FailureAction>) => void | State;
export interface KeyableRequestReducer<State, RequestAction extends AnyRsaaActionSet> {
    type: RsaaActionType.RSAA_REQUEST;
    endpoint: RequestAction['meta']['endpoint'];
    method: RequestAction['meta']['method'];
    reducer: KeyableRequestReducerMethod<State, RequestAction>;
}
export interface KeyableSuccessReducer<State, SuccessAction extends AnyRsaaActionSet> {
    type: RsaaActionType.RSAA_SUCCESS;
    endpoint: SuccessAction['meta']['endpoint'];
    method: SuccessAction['meta']['method'];
    reducer: KeyableSuccessReducerMethod<State, SuccessAction>;
}
export interface KeyableFailureReducer<State, FailureAction extends AnyRsaaActionSet> {
    type: RsaaActionType.RSAA_FAILURE;
    endpoint: FailureAction['meta']['endpoint'];
    method: FailureAction['meta']['method'];
    reducer: KeyableFailureReducerMethod<State, FailureAction>;
}
export declare type KeyableRsaaReducer<State, RsaaAction extends AnyRsaaActionSet = any> = KeyableRequestReducer<State, RsaaAction> | KeyableSuccessReducer<State, RsaaAction> | KeyableFailureReducer<State, RsaaAction>;
export declare const createKeyableRequestReducer: <State, ReducerAction extends import("./kracf").RsaaActionSet<any, any, any, any, any>>(endpoint: ReducerAction["meta"]["endpoint"], method: ReducerAction["meta"]["method"], reducer: KeyableRequestReducerMethod<State, ReducerAction>) => KeyableRequestReducer<State, ReducerAction>;
export declare const createKeyableSuccessReducer: <State, ReducerAction extends import("./kracf").RsaaActionSet<any, any, any, any, any>>(endpoint: ReducerAction["meta"]["endpoint"], method: ReducerAction["meta"]["method"], reducer: KeyableSuccessReducerMethod<State, ReducerAction>) => KeyableSuccessReducer<State, ReducerAction>;
export declare const createKeyableFailureReducer: <State, ReducerAction extends import("./kracf").RsaaActionSet<any, any, any, any, any>>(endpoint: ReducerAction["meta"]["endpoint"], method: ReducerAction["meta"]["method"], reducer: KeyableFailureReducerMethod<State, ReducerAction>) => KeyableFailureReducer<State, ReducerAction>;
export declare const combineKeyableRsaaReducers: <State = never>(defaultState: State) => (...keyableReducers: KeyableRsaaReducer<State, any>[]) => (baseState: State | undefined, action: Action<any>) => State;
