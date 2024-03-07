export class Util {
  constructor() {}

  getVariableName(variable) {
    return Object.keys({ variable })[0];
  }
}


export const util = new Util()

