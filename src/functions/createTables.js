import { TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY } from '../core/schemaTypes';
import { DB_TYPE_VARCHAR } from '../core/dbTypes';
import generateName from '../helpers/generateName';
import Table from '../models/Table';
import Attribute from '../models/Attribute';
import { NotNullConstraint, ForeignKeyConstraint } from '../models/Constraint';

const tables = [];

const processNode = (name, req, schema, json) => {
  const currentName = name || generateName();

  if (schema.type === TYPE_OBJECT) {
    const attributes = Object.keys(schema.properties)
      .map(key => processNode(key, true, schema.properties[key], json));
    const table = new Table(currentName, attributes);
    tables.push(table);

    return new Attribute(
      table.primaryKey.name,
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

  if (schema.type === TYPE_STRING) {
    return new Attribute(name, DB_TYPE_VARCHAR, {
      notNull: req && new NotNullConstraint(),
    });
  }

  if (schema.type === TYPE_ARRAY) {
    // const attribute = new Attribute(name, DB_TYPE_VARCHAR, )
  }

  // Map to string as a fallback
  return new Attribute(name, DB_TYPE_VARCHAR, {
    notNull: req && new NotNullConstraint(),
  });
};

const createTables = (schema, json) => {
  processNode(null, null, schema, json);

  return tables;
};

export default createTables;
