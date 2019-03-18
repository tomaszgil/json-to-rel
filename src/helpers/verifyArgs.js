import fs from 'fs';
import path from 'path';

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
    throw new Error('You have to specify mode ("ddl" or "csv").');
  }
  if (args.mode.toLowerCase() !== 'ddl' && args.mode.toLowerCase() !== 'csv') {
    throw new Error(`Invalid mode "${args.mode}".`);
  }
};

export default verifyArgs;
