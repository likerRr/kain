class Cmd {
  constructor(name, query = null, options = {}) {
    this.name = name;
    this.options = options;
    this.query = query;
  }

  isEmpty() {
    return this.query === '';
  }

  is(name) {
    return this.name === name;
  }
}

class CmdSignature {
  constructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }
}

module.exports.Cmd = Cmd;

module.exports.CmdSignature = CmdSignature;