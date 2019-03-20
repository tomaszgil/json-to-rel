export default class NullConstraint {
  static get label() {
    return 'NULL';
  }

  toDDL() {
    return this.constructor.label;
  }
}
