let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

/**
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
export function add(left, right) {
  const ret = wasm.add(left, right);
  return ret >>> 0;
}
