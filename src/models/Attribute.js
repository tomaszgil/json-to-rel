import NullConstraint from './NullConstraint';
import Logger, { LogMessage } from '../helpers/Logger';
import { MAX_TABLE_NAME_LENGTH } from '../core/dbConstants';

class Attribute {
  constructor(name, type, constraints) {
    if (name.length > MAX_TABLE_NAME_LENGTH) {
      Logger.log(new LogMessage('Maximum attribute name length exceeded.', 2));
    }

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
