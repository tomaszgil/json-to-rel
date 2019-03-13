#!/usr/bin/env node

import args from './helpers/arguments';
import logger from './helpers/logger';

import parseJson from './modules/parseJson';
import createJsonSchema from './modules/createJsonSchema';

parseJson(args, logger);
createJsonSchema(args, logger);

console.log('Hello world');
