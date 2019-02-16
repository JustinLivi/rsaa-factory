"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_api_middleware_1 = require("redux-api-middleware");
exports.createRsaaActionCreatorFactory = function (mapper) { return function (extractor) { return function (params) {
    var _a;
    return (_a = {},
        _a[redux_api_middleware_1.RSAA] = mapper(extractor(params)),
        _a);
}; }; };
//# sourceMappingURL=baseFactory.js.map