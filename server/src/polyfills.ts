// Minimal polyfill for Buffer.SlowBuffer required by some legacy dependencies
import { Buffer } from "buffer";

const bufferModule = require("buffer");

if (!bufferModule.SlowBuffer) {
    bufferModule.SlowBuffer = Buffer;
}
