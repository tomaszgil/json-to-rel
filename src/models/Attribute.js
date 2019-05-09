import NullConstraint from './NullConstraint';

class Attribute {
  constructor(name, type, constraints) {
    this.name = name;
    this.type = type;

    this.constraints = {};
    this.addConstraints(constraints);
  }

  addConstraints(constraints) {
    const { primaryKey, foreignKey, notNull } = constraints;

    if (primaryKey) {
      this.constraints.primaryKey = primaryKey;
    }

    if (foreignKey) {
      this.constraints.foreignKey = foreignKey;
    }

    if (notNull) {
      this.constraints.notNull = notNull;
    } else {
      this.constraints.null = new NullConstraint();
    }
  }

  toSQL() {
    const constraintsString = Object.keys(this.constraints)
      .map(c => this.constraints[c].toSQL())
      .join(' ');
    return `${this.name} ${this.type} ${constraintsString}`;
  }

  toCSV() {
    return this.name;
  }
}

export default Attribute;
