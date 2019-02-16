"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var redux_api_middleware_1 = require("redux-api-middleware");
var resolve_url_1 = __importDefault(require("resolve-url"));
var RsaaActionType;
(function (RsaaActionType) {
    RsaaActionType["RSAA_REQUEST"] = "RSAA_REQUEST";
    RsaaActionType["RSAA_SUCCESS"] = "RSAA_SUCCESS";
    RsaaActionType["RSAA_FAILURE"] = "RSAA_FAILURE";
})(RsaaActionType = exports.RsaaActionType || (exports.RsaaActionType = {}));
exports.createKeyableRsaaActionCreatorFactory = function (mapper) { return function (extractor) { return function (params) {
    var _a;
    return (_a = {},
        _a[redux_api_middleware_1.RSAA] = mapper(extractor(params)),
        _a);
}; }; };
exports.createStandardTypes = function (factoryParams) { return [
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
]; };
exports.createStandardEndpointReducer = function (apiBase) { return function (_a) {
    var params = _a.params, endpoint = _a.endpoint;
    return resolve_url_1.default(apiBase, lodash_1.reduce(params, function (result, value, key) { return result.replace(":" + key, value); }, endpoint));
}; };
exports.createStandardRsaaActionCreator = function (apiBase) {
    var endPointReducer = exports.createStandardEndpointReducer(apiBase);
    return exports.createKeyableRsaaActionCreatorFactory(function (factoryParams) {
        var method = factoryParams.method, body = factoryParams.body;
        return {
            body: JSON.stringify(body),
            endpoint: endPointReducer(factoryParams),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            method: method,
            types: exports.createStandardTypes(factoryParams)
        };
    });
};
//# sourceMappingURL=kracf.js.map