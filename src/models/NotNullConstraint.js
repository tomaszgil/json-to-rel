export default class NotNullConstraint {
  static get label() {
    return 'NOT NULL';
  }

  toDDL() {
    return this.constructor.label;
  }
}
