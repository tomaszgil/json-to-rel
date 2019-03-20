import Attribute from './Attribute';
import { DB_TYPE_NUMBER } from '../core/dbTypes';
import PrimaryKeyConstraint from './PrimaryKeyConstraint';
import NotNullConstraint from './NotNullConstraint';

class Table {
  constructor(name, attributes) {
    this.name = name;
    this.attributes = attributes;
    this.primaryKey = this.generatePrimaryKey();
  }

  generatePrimaryKey() {
    const primaryKey = new Attribute(
      `_ID_${this.name}`,
      DB_TYPE_NUMBER,
      {
        primaryKey: new PrimaryKeyConstraint(),
        notNull: new NotNullConstraint(),
      },
    );

    this.attributes.unshift(primaryKey);
    return primaryKey;
  }

  toDDL() {
    const attrString = this.attributes
      .map(a => `\t${a.toDDL()}`)
      .join(',\n');
    return `CREATE TABLE ${this.name} (\n${attrString}\n);`;
  }
}

export default Table;
