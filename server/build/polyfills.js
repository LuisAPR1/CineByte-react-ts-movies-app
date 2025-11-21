"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Minimal polyfill for Buffer.SlowBuffer required by some legacy dependencies
const buffer_1 = require("buffer");
const bufferModule = require("buffer");
if (!bufferModule.SlowBuffer) {
    bufferModule.SlowBuffer = buffer_1.Buffer;
}
