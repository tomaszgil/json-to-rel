#!/usr/bin/env node

// import args from './helpers/arguments';
// import logger from './helpers/logger';

import parseJson from './modules/parseJson';
import createJsonSchema from './modules/createJsonSchema';

const json = parseJson('./data/input-simple.json');
const schema = createJsonSchema(json);

console.log(schema);
