let imports = {};
let wasm;
/**
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
module.exports.add = function (left, right) {
  const ret = wasm.add(left, right);
  return ret >>> 0;
};

const path = require("path").join(__dirname, "rust-functions_bg.wasm");
const bytes = require("fs").readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;
