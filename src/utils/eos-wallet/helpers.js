export function getRPCUrlForNetworkInfo({ chainId, port, protocol, host }) {
  return protocol + "://" + host + ":" + port;
}

export function parseStringAuthorization(authStr) {
  if (typeof authStr === "string") {
    const atInd = authStr.indexOf("@");
    if (atInd === -1) {
      // active by default
      return {
        actor: authStr,
        permission: "active"
      };
    } else {
      return {
        actor: authStr.substring(0, atInd),
        permission: authStr.substring(atInd + 1)
      };
    }
  }
}

export function ensureArray(valueOrArray) {
  return Array.isArray(valueOrArray)
    ? valueOrArray
    : typeof valueOrArray === "undefined"
    ? []
    : [valueOrArray];
}
