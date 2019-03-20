export default class PrimaryKeyConstraint {
  static get label() {
    return 'PRIMARY KEY';
  }

  toDDL() {
    return this.constructor.label;
  }
}
