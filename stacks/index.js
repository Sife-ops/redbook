"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("./stack");
function default_1(app) {
    app.setDefaultFunctionProps({
        runtime: "nodejs16.x",
        srcPath: "api",
        bundle: {
            format: "esm",
        },
    });
    app.stack(stack_1.stack);
}
exports.default = default_1;
