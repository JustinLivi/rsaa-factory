"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = __importDefault(require("immer"));
var lodash_1 = require("lodash");
var kracf_1 = require("./kracf");
exports.createKeyableRequestReducer = function (endpoint, method, reducer) { return ({
    endpoint: endpoint,
    method: method,
    reducer: reducer,
    type: kracf_1.RsaaActionType.RSAA_REQUEST
}); };
exports.createKeyableSuccessReducer = function (endpoint, method, reducer) { return ({
    endpoint: endpoint,
    method: method,
    reducer: reducer,
    type: kracf_1.RsaaActionType.RSAA_SUCCESS
}); };
exports.createKeyableFailureReducer = function (endpoint, method, reducer) { return ({
    endpoint: endpoint,
    method: method,
    reducer: reducer,
    type: kracf_1.RsaaActionType.RSAA_FAILURE
}); };
exports.combineKeyableRsaaReducers = function (defaultState) { return function () {
    var keyableReducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keyableReducers[_i] = arguments[_i];
    }
    return function (baseState, action) {
        if (baseState === void 0) { baseState = defaultState; }
        var newState = baseState;
        lodash_1.mapValues(keyableReducers, function (reducer) {
            if (reducer.type === action.type &&
                reducer.endpoint === lodash_1.get(action, 'meta.endpoint') &&
                reducer.method === lodash_1.get(action, 'meta.method')) {
                // tslint:disable-next-line:no-object-literal-type-assertion
                newState = __assign({}, (immer_1.default(baseState, function (state) {
                    return reducer.reducer(state, action);
                }) || {}));
                return true;
            }
        });
        return newState;
    };
}; };
//# sourceMappingURL=reducers.js.map