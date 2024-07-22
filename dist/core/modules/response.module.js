"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res) => {
    return {
        success: (payload) => res.json(Object.assign({ isError: false }, payload)),
        error: (errorCode, payload) => res.status(errorCode).json(Object.assign({ isError: true }, payload)),
    };
};
exports.response = response;
//# sourceMappingURL=response.module.js.map