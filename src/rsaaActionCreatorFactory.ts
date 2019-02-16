import { HttpMethod, ReduxStandardApiCallingAction, ReduxStandardApiCallingActionBody, RSAA } from 'redux-api-middleware';

export type IRsaaCreatorMapper<
  Params,
  Body extends ReduxStandardApiCallingActionBody
> = (p: Params) => Body;

export interface BaseRsaaMeta {
  method: HttpMethod;
  endpoint: any;
  params?: object;
  body?: object;
}

export interface BaseRsaaAction {
  meta: BaseRsaaMeta;
}

export interface RsaaMeta<Method extends HttpMethod = any, Endpoint = any> {
  endpoint: Endpoint;
  method: Method;
}

export type RsaaActionCreatorFactory<
  Params,
  Body extends ReduxStandardApiCallingActionBody = ReduxStandardApiCallingActionBody
> = (params: Params) => ReduxStandardApiCallingAction<Body>;

export const createRsaaActionCreatorFactory = <
  Params extends RsaaMeta,
  Body extends ReduxStandardApiCallingActionBody = ReduxStandardApiCallingActionBody
>(
  mapper: IRsaaCreatorMapper<Params, Body>
) => <ExtractorParams = never>(
  extractor: (params: ExtractorParams) => Params
): RsaaActionCreatorFactory<ExtractorParams, Body> => params => ({
  [RSAA]: mapper(extractor(params))
});
