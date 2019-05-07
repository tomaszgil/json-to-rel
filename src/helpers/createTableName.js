import { TRUNCATED_NAME_LENGTH } from '../core/dbConstants';
import { truncateTableName } from '../../config.json';

const createTableName = (name, path) => {
  let shortName = name;
  if (truncateTableName) {
    shortName = name.substring(0, TRUNCATED_NAME_LENGTH);
  }

  return path ? `${path}_${shortName}` : shortName;
};

export default createTableName;
