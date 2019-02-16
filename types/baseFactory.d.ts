import { HttpMethod, ReduxStandardApiCallingAction, ReduxStandardApiCallingActionBody } from 'redux-api-middleware';
export declare type IRsaaCreatorMapper<Params, Body extends ReduxStandardApiCallingActionBody> = (p: Params) => Body;
export interface RsaaMeta<Method extends HttpMethod = any, Endpoint = any> {
    endpoint: Endpoint;
    method: Method;
}
export declare type RsaaActionCreatorFactory<ExtractorParams, Body extends ReduxStandardApiCallingActionBody = ReduxStandardApiCallingActionBody> = (params: ExtractorParams) => ReduxStandardApiCallingAction<Body>;
export declare const createRsaaActionCreatorFactory: <FactoryParams extends RsaaMeta<any, any>, Body_1 extends ReduxStandardApiCallingActionBody<any, any, any, RequestInit, any> = ReduxStandardApiCallingActionBody<any, any, any, RequestInit, any>>(mapper: IRsaaCreatorMapper<FactoryParams, Body_1>) => <ExtractorParams = never>(extractor: (params: ExtractorParams) => FactoryParams) => RsaaActionCreatorFactory<ExtractorParams, Body_1>;
