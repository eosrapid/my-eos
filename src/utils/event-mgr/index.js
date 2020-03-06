export default class EventManager {
  constructor() {
    this.ctr = 0;
    this.callbackMap = {};
    this.addListener = this.addListener.bind(this);
    this.fireEvent = this.fireEvent.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }
  addPromiseListener(eventName, options, rejectHookup) {
    const _this = this;
    return new Promise((resolve, reject) => {
      const realOptions = Object.assign({}, options || {}, { once: true });
      const id = _this.addListener(eventName, (payload) => {
        resolve(payload);
      }, realOptions);
      const onReject = (err) => {
        _this.removeListener(id);
        reject(err);
      }
      rejectHookup(onReject);
    });
  }
  addListener(eventName, func, options = {}) {
    const ctrId = this.ctr++;
    const callbackObject = {
      f: typeof func === "function" ? func : () => 0,
      options: options,
      id: ctrId
    };
    const cbMapKey = eventName;
    this.callbackMap[cbMapKey] = this.callbackMap.hasOwnProperty(cbMapKey)
      ? this.callbackMap[cbMapKey].concat(callbackObject)
      : [callbackObject];
    return ctrId;
  }
  fireEvent(eventName, payload) {
    if (this.callbackMap.hasOwnProperty(eventName)) {
      const cbArrTmp = this.callbackMap[eventName];
      if (Array.isArray(cbArrTmp) && cbArrTmp.length !== 0) {

        const cbArr = cbArrTmp.concat([]);
        this.callbackMap[eventName] = cbArrTmp.filter(o => (
          !o.options || !o.options.once
        ));
        const len = cbArr.length;
        for (let i = 0; i < len; i++) {
          try {
            const c = cbArr[i];
            if (typeof c.f === 'function') {
              c.f(payload);
            }
          } catch (error) {
            // do nothing and move on to the next one
          }
        }
      }
    }
  }
  removeListener(eventName, idOrFunction) {
    if (!this.callbackMap.hasOwnProperty(eventName)) {
      return false;
    }
    const cbArr = this.callbackMap[eventName];
    if (!Array.isArray(cbArr) || cbArr.length === 0) {
      return false;
    }
    const len = cbArr.length;
    if (typeof idOrFunction === "function") {
      for (let i = 0; i < len; i++) {
        if (cbArr[i].f === idOrFunction) {
          this.callbackMap[eventName] = cbArr
            .slice(0, i)
            .concat(cbArr.slice(i + 1));
          return true;
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (cbArr[i].id === idOrFunction) {
          this.callbackMap[eventName] = cbArr
            .slice(0, i)
            .concat(cbArr.slice(i + 1));
          return true;
        }
      }
    }
    return false;
  }
}
