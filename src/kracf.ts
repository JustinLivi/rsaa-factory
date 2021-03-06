import { reduce } from 'lodash';
import {
  ApiError,
  HttpMethod,
  ReduxStandardApiCallingAction,
  ReduxStandardApiCallingActionBody,
  RSAA,
} from 'redux-api-middleware';
import resolveUrl from 'resolve-url';

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

export enum RsaaActionType {
  RSAA_REQUEST = 'RSAA_REQUEST',
  RSAA_SUCCESS = 'RSAA_SUCCESS',
  RSAA_FAILURE = 'RSAA_FAILURE'
}

export interface RsaaRequestAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_REQUEST;
  meta: Meta;
  error?: boolean;
}

export interface RsaaSuccessAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_SUCCESS;
  meta: Meta;
  payload: Payload;
}

export interface RsaaFailureAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_FAILURE;
  meta: Meta;
  payload: ApiError<Payload>;
}

export type RsaaActionSet<
  Meta extends RsaaMeta<Method, Endpoint>,
  SuccessPayload,
  FailurePayload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> =
  | RsaaRequestAction<Meta, Method, Endpoint>
  | RsaaSuccessAction<Meta, SuccessPayload, Method, Endpoint>
  | RsaaFailureAction<Meta, FailurePayload, Method, Endpoint>;

export type AnyRsaaActionSet = RsaaActionSet<any, any, any>;

export type ExtractRequestAction<
  A extends AnyRsaaActionSet
> = A extends RsaaRequestAction<infer Meta>
  ? RsaaRequestAction<A['meta'], A['meta']['method'], A['meta']['endpoint']>
  : never;

export type ExtractSuccessAction<
  A extends AnyRsaaActionSet
> = A extends RsaaSuccessAction<infer Meta, infer Payload>
  ? RsaaSuccessAction<
      A['meta'],
      A['payload'],
      A['meta']['method'],
      A['meta']['endpoint']
    >
  : never;

export type ExtractFailureAction<
  A extends AnyRsaaActionSet
> = A extends RsaaFailureAction<infer Meta, infer Payload>
  ? RsaaFailureAction<
      A['meta'],
      A['payload']['response'],
      A['meta']['method'],
      A['meta']['endpoint']
    >
  : never;

export type KeyableRsaaActionType<Params extends BaseRsaaMeta> = [
  {
    meta: Params;
    type: RsaaActionType.RSAA_REQUEST;
  },
  {
    meta: Params;
    type: RsaaActionType.RSAA_SUCCESS;
  },
  {
    meta: Params;
    type: RsaaActionType.RSAA_FAILURE;
  }
];

export interface KeyableRsaaActionBody<Params extends BaseRsaaMeta>
  extends ReduxStandardApiCallingActionBody {
  types: KeyableRsaaActionType<Params>;
}

export type KeyableRsaaActionCreatorFactory<
  ExtractorParams,
  FactoryParams extends BaseRsaaMeta,
  Body extends KeyableRsaaActionBody<FactoryParams>
> = (params: ExtractorParams) => ReduxStandardApiCallingAction<Body>;

export const createKeyableRsaaActionCreatorFactory = <
  FactoryParams extends BaseRsaaMeta,
  Body extends KeyableRsaaActionBody<FactoryParams> = KeyableRsaaActionBody<
    FactoryParams
  >
>(
  mapper: IRsaaCreatorMapper<FactoryParams, Body>
) => <ExtractorParams = never>(
  extractor: (params: ExtractorParams) => FactoryParams
): KeyableRsaaActionCreatorFactory<
  ExtractorParams,
  FactoryParams,
  Body
> => params => ({
  [RSAA]: mapper(extractor(params))
});

export const createStandardTypes = <FactoryParams extends BaseRsaaMeta>(
  factoryParams: FactoryParams
): KeyableRsaaActionType<FactoryParams> => [
  {
    meta: factoryParams,
    type: RsaaActionType.RSAA_REQUEST
  },
  {
    meta: factoryParams,
    type: RsaaActionType.RSAA_SUCCESS
  },
  {
    meta: factoryParams,
    type: RsaaActionType.RSAA_FAILURE
  }
];

export const createStandardEndpointReducer = (apiBase: string) => <
  FactoryParams extends BaseRsaaMeta
>({
  params,
  endpoint
}: FactoryParams) =>
  resolveUrl(
    apiBase,
    reduce(
      params,
      (result, value, key) => result.replace(`:${key}`, value),
      endpoint
    )
  );

export const createStandardRsaaActionCreator = (apiBase: string) => {
  const endPointReducer = createStandardEndpointReducer(apiBase);
  return createKeyableRsaaActionCreatorFactory<BaseRsaaMeta>(factoryParams => {
    const { method, body } = factoryParams;
    return {
      body: JSON.stringify(body),
      endpoint: endPointReducer(factoryParams),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      method,
      types: createStandardTypes(factoryParams)
    };
  });
};
