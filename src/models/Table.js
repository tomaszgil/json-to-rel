import Attribute from './Attribute';
import { TYPE_DB_NUMBER } from '../core/dbTypes';
import { PrimaryKey } from './Constraint';

class Table {
  constructor(name, attributes) {
    this.name = name;
    this.attributes = attributes;
    this.primaryKey = this.generatePrimaryKey();
  }

  generatePrimaryKey() {
    const primaryKey = new Attribute(
      `_ID_${this.name}`,
      TYPE_DB_NUMBER,
      { primaryKey: new PrimaryKey() },
    );

    this.attributes.unshift(primaryKey);
    return primaryKey;
  }
}

export default Table;
