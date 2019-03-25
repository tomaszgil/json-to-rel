import Table from '../models/Table';
import Attribute from '../models/Attribute';
import NotNullConstraint from '../models/NotNullConstraint';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';

import { rootTableName, surrogatePrimaryKeyName } from '../../config.json';

import {
  DB_TYPE_VARCHAR, DB_TYPE_NUMBER,
} from '../core/dbTypes';
import {
  TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY, TYPE_NUMBER,
} from '../core/schemaTypes';

class SchemaProcessor {
  constructor(schema, json) {
    this.tables = [];
    this.schema = schema;
    this.json = json;
  }

  process() {
    this.processNode(rootTableName, null, null, this.schema, this.json);
    return this.tables;
  }

  processAttributes(properties, required, table, json) {
    return Object
      .keys(properties)
      .map(key => this.processNode(
        key, required.includes(key), table, properties[key], json,
      ))
      .filter(attr => attr);
  }

  processNode(name, req, parentTable, schema, json) {
    if (schema.type === TYPE_OBJECT) {
      const { properties } = schema;
      const table = new Table(name);
      const attributes = this.processAttributes(
        properties, Object.keys(properties), table, json,
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
        properties, required, table, json,
      );

      attributes.unshift(new Attribute(
        `${parentName}${surrogatePrimaryKeyName}`,
        parentKey.type,
        {
          foreignKey: new ForeignKeyConstraint(parentName, parentKey.name),
          notNull: new NotNullConstraint(),
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
      return new Attribute(name, DB_TYPE_VARCHAR, {
        notNull: req && new NotNullConstraint(),
      });
    }

    // String as a fallback
    return new Attribute(name, DB_TYPE_VARCHAR, {
      notNull: req && new NotNullConstraint(),
    });
  }
}

export default SchemaProcessor;
