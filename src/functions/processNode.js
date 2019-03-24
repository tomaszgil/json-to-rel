import Table from '../models/Table';
import Attribute from '../models/Attribute';
import NotNullConstraint from '../models/NotNullConstraint';
import ForeignKeyConstraint from '../models/ForeignKeyConstraint';
import reduceRecurentOutput from './reduceRecurentOutput';

import { surrogatePrimaryKeyName } from '../../config.json';

import {
  DB_TYPE_VARCHAR, DB_TYPE_NUMBER,
} from '../core/dbTypes';
import {
  TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY, TYPE_NUMBER,
} from '../core/schemaTypes';

const output = (tables, attribute) => ({
  tables, attribute,
});

const processNode = (name, req, parentTable, schema, json, tables) => {
  if (schema.type === TYPE_OBJECT) {
    const table = new Table(name);
    const { properties } = schema;
    const { tables: reccurentTables, attributes } = reduceRecurentOutput(
      Object.keys(properties)
        .map(key => processNode(
          key, true, table, properties[key], json, tables,
        )),
    );
    table.setAttributes(attributes);

    const newTables = [...tables, ...reccurentTables, table];
    const fk = new Attribute(
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

    return output(newTables, fk);
  }

  if (schema.type === TYPE_ARRAY) {
    const { primaryKey: parentKey, name: parentName } = parentTable;
    const table = new Table(name);
    const { required, properties } = schema.items;
    const { tables: reccurentTables, attributes } = reduceRecurentOutput(
      Object.keys(properties)
        .map(key => processNode(
          key, required.includes(key), table, properties[key], json, tables,
        )),
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

    const newTables = [...tables, ...reccurentTables, table];
    return output(newTables);
  }

  if (schema.type === TYPE_NUMBER) {
    const attr = new Attribute(name, DB_TYPE_NUMBER, {
      notNull: req && new NotNullConstraint(),
    });

    return output(tables, attr);
  }

  if (schema.type === TYPE_STRING) {
    const attr = new Attribute(name, DB_TYPE_VARCHAR, {
      notNull: req && new NotNullConstraint(),
    });

    return output(tables, attr);
  }

  // String as a fallback
  const attr = new Attribute(name, DB_TYPE_VARCHAR, {
    notNull: req && new NotNullConstraint(),
  });

  return output(tables, attr);
};

export default processNode;
