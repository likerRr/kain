class MenuItem/* extends EventEmitter*/ {
  constructor({id, title, desc, onExecute, payload, redirect, single, icon}) {
    this.id = id;
    this.title = title || '';
    this.desc = desc || '';
    this.payload = payload;
    this.redirect = redirect;
    this.onExecute = onExecute;
    this.single = single || false; // allows only one item be in response
    this.icon = icon || '';
  }

  /**
   * Sets item's payload
   * @param payload
   */
  setPayload(payload) {
    this.payload = payload;
  }

  /**
   * Executes item's callback
   */
  execute() {
    if (this.onExecute) {
      this.onExecute();
    }
  }
}

module.exports = MenuItem;