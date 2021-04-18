export const SIG_PROVIDERS = {
  NONE: 1,
  PRIVATE_KEY: 2,
  SCATTER: 3,
  ANCHOR_LINK: 4,
};

export const WALLET_EVENTS = {
  LOGIN: "login",
  LOGOUT: "logout",
  TX_START: "tx_start",
  TX_SUCCESS: "tx_success",
  TX_ERROR: "tx_error",
  TX_EXIT: "tx_exit"
};
export const SKIPPABLE_MODALS = [
  "tx_success",
  "tx_error",
  "login_success",
  
]

export const LOGOUT_TYPES = {
  STANDARD: 0,
  NEW_LOGIN: 1,
  CLEAR_SESSION: 2,
};
