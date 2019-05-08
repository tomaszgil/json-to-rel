import Table from '../models/Table';
import Attribute from '../models/Attribute';
import NotNullConstraint from '../models/NotNullConstraint';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import { rootTableName } from '../../config.json';

import {
  DB_TYPE_STRING, DB_TYPE_NUMBER,
} from '../core/dbTypes';
import {
  TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY, TYPE_NUMBER,
} from '../core/schemaTypes';

class SchemaProcessor {
  constructor(schema) {
    this.tables = [];
    this.schema = schema;
  }

  process() {
    this.processNode(rootTableName, null, null, this.schema);
    return this.tables;
  }

  processAttributes(properties, required, table) {
    return Object
      .keys(properties)
      .map(key => this.processNode(
        key, required.includes(key), table, properties[key],
      ))
      .filter(attr => attr);
  }

  processNode(name, req, parentTable, schema) {
    if (schema.type === TYPE_OBJECT) {
      const { properties } = schema;
      const table = new Table(name);
      const attributes = this.processAttributes(
        properties, Object.keys(properties), table,
      );
      table.setAttributes(attributes);
      this.tables.push(table);

      return new Attribute(
        name,
        table.primaryKey.type,
        {
          notNull: req && new NotNullConstraint(),
          foreignKey: new ForeignKeyConstraint(
            table.name,
            table.primaryKey.name,
          ),
        },
      );
    }

    if (schema.type === TYPE_ARRAY) {
      const { primaryKey: parentKey, name: parentName } = parentTable;
      const { required, properties } = schema.items;
      const table = new Table(name);
      const attributes = this.processAttributes(
        properties, required, table,
      );

      attributes.unshift(new Attribute(
        ForeignKeyConstraint.getAttributeName(parentName),
        parentKey.type,
        {
          foreignKey: new ForeignKeyConstraint(parentName, parentKey.name),
          notNull: req && new NotNullConstraint(),
        },
      ));
      table.setAttributes(attributes);
      this.tables.push(table);

      return null;
    }

    if (schema.type === TYPE_NUMBER) {
      return new Attribute(name, DB_TYPE_NUMBER, {
        notNull: req && new NotNullConstraint(),
      });
    }

    if (schema.type === TYPE_STRING) {
      return new Attribute(name, DB_TYPE_STRING, {
        notNull: req && new NotNullConstraint(),
      });
    }

    // String as a fallback
    return new Attribute(name, DB_TYPE_STRING, {
      notNull: req && new NotNullConstraint(),
    });
  }
}

export default SchemaProcessor;
