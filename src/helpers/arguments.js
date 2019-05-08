import program from 'commander';
import verifyArgs from './verifyArgs';
import { MODE_CSV, MODE_DDL } from '../core/outputModes';

const toLowerCase = value => value.toLowerCase();

program
  .version('1.0')
  .option('-i, --input <file>', 'path to input JSON file')
  .option('-m, --mode <mode>', `program mode: "${MODE_DDL}" or "${MODE_CSV}"`, toLowerCase)
  .option('-o, --output <dir>', 'path to output directory')
  .option('-l, --logging', 'turn on logging')
  .on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('  $ json-to-relational -i ./input.json -m ddl -o ./output -l');
  })
  .parse(process.argv);

if (!program.logging) {
  program.logging = false;
}

try {
  verifyArgs(program);
} catch (e) {
  console.log(e.message);
  process.exit(1);
}

export default program;
