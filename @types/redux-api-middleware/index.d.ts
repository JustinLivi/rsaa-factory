declare module 'redux-api-middleware' {
  import { Middleware, Dispatch, MiddlewareAPI, AnyAction } from 'redux';

  export type HttpMethod =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS';
  export type Credentials = 'omit' | 'same-origin' | 'include';

  export const RSAA = '@@redux-api-middleware/RSAA';

  export interface MetaConfigurationFunction<
    Meta extends object = any,
    State extends object = any,
    FetchOptions = RequestInit,
    Action = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    (action: Action, state: State): Meta;
  }

  export interface RequestPayloadConfigurationFunction<
    Payload extends object = any,
    State extends object = any,
    FetchOptions = RequestInit,
    Action = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    (action: Action, state: State): Payload;
  }

  export interface SuccessPayloadConfigurationFunction<
    Payload extends object = any,
    State extends object = any,
    FetchOptions = RequestInit,
    Action = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    (action: Action, state: State, res: Response): Payload;
  }

  export interface RequestTypeDescriptor<
    State extends object = any,
    Meta extends object = any,
    Payload extends object = any,
    FetchOptions = RequestInit,
    Action extends ReduxStandardApiCallingAction<
      State,
      FetchOptions
    > = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    type: string;
    meta?: Meta | MetaConfigurationFunction<Meta, State, FetchOptions, Action>;
    payload?:
      | Payload
      | RequestPayloadConfigurationFunction<
          Payload,
          State,
          FetchOptions,
          Action
        >;
  }

  export interface SuccessTypeDescriptor<
    State extends object = any,
    Meta extends object = any,
    Payload extends object = any,
    FetchOptions = RequestInit,
    Action extends ReduxStandardApiCallingAction<
      State,
      FetchOptions
    > = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    type: string;
    meta?: Meta | MetaConfigurationFunction<Meta, State, FetchOptions, Action>;
    payload?:
      | Payload
      | SuccessPayloadConfigurationFunction<
          Payload,
          State,
          FetchOptions,
          Action
        >;
  }

  export interface RsaaHeadersObject {
    [key: string]: string;
  }
  export interface RsaaHeadersFunction<State extends object = any> {
    (state: State): RsaaHeadersObject;
  }
  export type RsaaHeaders<State extends object = any> =
    | RsaaHeadersObject
    | RsaaHeadersFunction<State>;

  export interface ReduxStandardApiCallingActionBody<
    State extends object = any,
    Meta extends object = any,
    Payload extends object = any,
    FetchOptions = RequestInit,
    Action extends ReduxStandardApiCallingAction<
      State,
      FetchOptions
    > = ReduxStandardApiCallingAction<State, FetchOptions>
  > {
    endpoint: string;
    method: HttpMethod;
    types: [

        | RequestTypeDescriptor<State, Meta, Payload, FetchOptions, Action>
        | string,


        | SuccessTypeDescriptor<State, Meta, Payload, FetchOptions, Action>
        | string,

      SuccessTypeDescriptor<State, Meta, Payload, FetchOptions, Action> | string
    ];
    body?:
      | string
      | Blob
      | ArrayBufferView
      | ArrayBuffer
      | FormData
      | URLSearchParams
      | ReadableStream<Uint8Array>
      | null
      | undefined;
    headers?: RsaaHeaders<State>;
    options?: FetchOptions;
    credentials?: Credentials;
    fetch?: fetch;
  }

  export interface ReduxStandardApiCallingAction<
    Body extends ReduxStandardApiCallingActionBody
  > {
    [RSAA]: Body;
  }
  export interface RsaaMiddlewareOptions {
    ok?: (res: Response) => boolean;
    fetch?: fetch;
  }

  export function isRSAA(action: object): boolean;
  export function validateRSAA(action: object): string[];
  export function isValidRSAA(action: object): boolean;
  export class InvalidRSAA extends Error {
    constructor(validationErrors: string[]);
    name: 'InvalidRSAA';
    message: 'Invalid RSAA';
    validationErrors: string[];
  }
  export class InternalError extends Error {
    constructor(message: string);
    name: 'InternalError';
    message: string;
  }
  export class RequestError extends Error {
    constructor(message: string);
    name: 'RequestError';
    message: string;
  }
  export class ApiError<Payload = any> extends Error {
    constructor(status: number, statusText: string, response: Payload);
    name: 'ApiError';
    status: number;
    statusText: statusText;
    response: Payload;
    message: string;
  }
  export function getJSON<Payload = any>(res: Response): Promise<Payload>;
  export function createMiddleware<
    DispatchExt = {},
    S = any,
    D extends Dispatch = Dispatch
  >(options: RsaaMiddlewareOptions): Middleware<DispatchExt, S, D>;
  export function apiMiddleware(
    api: MiddlewareAPI<D, S>
  ): (next: Dispatch<AnyAction>) => (action: any) => any;
}
