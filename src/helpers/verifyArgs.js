import fs from 'fs';
import path from 'path';
import { MODE_CSV, MODE_SQL } from '../core/outputModes';

const verifyArgs = (args) => {
  if (!args.input) {
    throw new Error('You have to specify input file.');
  }
  if (!fs.existsSync(args.input)) {
    throw new Error(`File "${args.input}" does not exist.`);
  }
  if (!fs.lstatSync(args.input).isFile()) {
    throw new Error(`"${args.input}" is not a file.`);
  }
  if (path.extname(args.input).toLowerCase() !== '.json') {
    throw new Error(`"${args.input}" is not a JSON file.`);
  }
  if (!args.output) {
    throw new Error('You have to specify output directory.');
  }
  if (!fs.existsSync(args.output)) {
    throw new Error(`Directory "${args.output}" does not exist.`);
  }
  if (!fs.lstatSync(args.output).isDirectory()) {
    throw new Error(`"${args.output}" is not a directory.`);
  }
  if (!args.mode) {
    throw new Error(`You have to specify mode ("${MODE_SQL}" or "${MODE_CSV}").`);
  }
  if (args.mode !== MODE_SQL && args.mode !== MODE_CSV) {
    throw new Error(`Invalid mode "${args.mode}".`);
  }
  if (args.config && !fs.existsSync(args.config)) {
    throw new Error(`File ${args.config} does not exist.`);
  }
  if (path.extname(args.config).toLowerCase() !== '.json') {
    throw new Error(`"${args.config}" is not a JSON file.`);
  }
};

export default verifyArgs;
