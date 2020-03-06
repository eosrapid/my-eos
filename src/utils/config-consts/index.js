const CONFIG_CONSTS = {};
function setConfigConst(key, value) {
  CONFIG_CONSTS[key] = value;

}
function getConfigConst(key) {
  return CONFIG_CONSTS[key];
}

export {
  setConfigConst,
  getConfigConst,
}