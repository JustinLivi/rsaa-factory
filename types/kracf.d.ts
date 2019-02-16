import { ApiError, HttpMethod, ReduxStandardApiCallingAction, ReduxStandardApiCallingActionBody } from 'redux-api-middleware';
import { IRsaaCreatorMapper, RsaaMeta } from './baseFactory';
export interface BaseRsaaMeta {
    method: HttpMethod;
    endpoint: any;
    params?: object;
    body?: object;
}
export interface BaseRsaaAction {
    meta: BaseRsaaMeta;
}
export declare enum RsaaActionType {
    RSAA_REQUEST = "RSAA_REQUEST",
    RSAA_SUCCESS = "RSAA_SUCCESS",
    RSAA_FAILURE = "RSAA_FAILURE"
}
export interface RsaaRequestAction<Meta extends RsaaMeta<Method, Endpoint>, Method extends HttpMethod = Meta['method'], Endpoint = Meta['endpoint']> extends BaseRsaaAction {
    type: RsaaActionType.RSAA_REQUEST;
    meta: Meta;
    error?: boolean;
}
export interface RsaaSuccessAction<Meta extends RsaaMeta<Method, Endpoint>, Payload, Method extends HttpMethod = Meta['method'], Endpoint = Meta['endpoint']> extends BaseRsaaAction {
    type: RsaaActionType.RSAA_SUCCESS;
    meta: Meta;
    payload: Payload;
}
export interface RsaaFailureAction<Meta extends RsaaMeta<Method, Endpoint>, Payload, Method extends HttpMethod = Meta['method'], Endpoint = Meta['endpoint']> extends BaseRsaaAction {
    type: RsaaActionType.RSAA_FAILURE;
    meta: Meta;
    payload: ApiError<Payload>;
}
export declare type RsaaActionSet<Meta extends RsaaMeta<Method, Endpoint>, SuccessPayload, FailurePayload, Method extends HttpMethod = Meta['method'], Endpoint = Meta['endpoint']> = RsaaRequestAction<Meta, Method, Endpoint> | RsaaSuccessAction<Meta, SuccessPayload, Method, Endpoint> | RsaaFailureAction<Meta, FailurePayload, Method, Endpoint>;
export declare type AnyRsaaActionSet = RsaaActionSet<any, any, any>;
export declare type ExtractRequestAction<A extends AnyRsaaActionSet> = A extends RsaaRequestAction<infer Meta> ? RsaaRequestAction<A['meta'], A['meta']['method'], A['meta']['endpoint']> : never;
export declare type ExtractSuccessAction<A extends AnyRsaaActionSet> = A extends RsaaSuccessAction<infer Meta, infer Payload> ? RsaaSuccessAction<A['meta'], A['payload'], A['meta']['method'], A['meta']['endpoint']> : never;
export declare type ExtractFailureAction<A extends AnyRsaaActionSet> = A extends RsaaFailureAction<infer Meta, infer Payload> ? RsaaFailureAction<A['meta'], A['payload']['response'], A['meta']['method'], A['meta']['endpoint']> : never;
export declare type KeyableRsaaActionType<Params extends BaseRsaaMeta> = [{
    meta: Params;
    type: RsaaActionType.RSAA_REQUEST;
}, {
    meta: Params;
    type: RsaaActionType.RSAA_SUCCESS;
}, {
    meta: Params;
    type: RsaaActionType.RSAA_FAILURE;
}];
export interface KeyableRsaaActionBody<Params extends BaseRsaaMeta> extends ReduxStandardApiCallingActionBody {
    types: KeyableRsaaActionType<Params>;
}
export declare type KeyableRsaaActionCreatorFactory<ExtractorParams, FactoryParams extends BaseRsaaMeta, Body extends KeyableRsaaActionBody<FactoryParams>> = (params: ExtractorParams) => ReduxStandardApiCallingAction<Body>;
export declare const createKeyableRsaaActionCreatorFactory: <FactoryParams extends BaseRsaaMeta, Body_1 extends KeyableRsaaActionBody<FactoryParams> = KeyableRsaaActionBody<FactoryParams>>(mapper: IRsaaCreatorMapper<FactoryParams, Body_1>) => <ExtractorParams = never>(extractor: (params: ExtractorParams) => FactoryParams) => KeyableRsaaActionCreatorFactory<ExtractorParams, FactoryParams, Body_1>;
export declare const createStandardTypes: <FactoryParams extends BaseRsaaMeta>(factoryParams: FactoryParams) => [{
    meta: FactoryParams;
    type: RsaaActionType.RSAA_REQUEST;
}, {
    meta: FactoryParams;
    type: RsaaActionType.RSAA_SUCCESS;
}, {
    meta: FactoryParams;
    type: RsaaActionType.RSAA_FAILURE;
}];
export declare const createStandardEndpointReducer: (apiBase: string) => <FactoryParams extends BaseRsaaMeta>({ params, endpoint }: FactoryParams) => string;
export declare const createStandardRsaaActionCreator: (apiBase: string) => <ExtractorParams = never>(extractor: (params: ExtractorParams) => BaseRsaaMeta) => KeyableRsaaActionCreatorFactory<ExtractorParams, BaseRsaaMeta, KeyableRsaaActionBody<BaseRsaaMeta>>;
