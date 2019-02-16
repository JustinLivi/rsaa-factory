import { HttpMethod, ReduxStandardApiCallingAction, ReduxStandardApiCallingActionBody, RSAA } from 'redux-api-middleware';

export type IRsaaCreatorMapper<
  Params,
  Body extends ReduxStandardApiCallingActionBody
> = (p: Params) => Body;

export interface RsaaMeta<Method extends HttpMethod = any, Endpoint = any> {
  endpoint: Endpoint;
  method: Method;
}

export type RsaaActionCreatorFactory<
  ExtractorParams,
  Body extends ReduxStandardApiCallingActionBody = ReduxStandardApiCallingActionBody
> = (params: ExtractorParams) => ReduxStandardApiCallingAction<Body>;

export const createRsaaActionCreatorFactory = <
  FactoryParams extends RsaaMeta,
  Body extends ReduxStandardApiCallingActionBody = ReduxStandardApiCallingActionBody
>(
  mapper: IRsaaCreatorMapper<FactoryParams, Body>
) => <ExtractorParams = never>(
  extractor: (params: ExtractorParams) => FactoryParams
): RsaaActionCreatorFactory<ExtractorParams, Body> => params => ({
  [RSAA]: mapper(extractor(params))
});
