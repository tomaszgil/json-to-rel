class Attribute {
  constructor(name, type, constraints) {
    this.name = name;
    this.type = type;

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
    }
  }
}

export default Attribute;
