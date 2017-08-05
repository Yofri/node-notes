// to parse argument in cli
const yargs = require('yargs');
// code splitting purpose
const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .alias('help', 'h')
  .argv;

// read the input command from yargs #1 object
const command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs', argv);

switch(command) {
  case 'add':
    notes.addNote(argv.title, argv.body);
    break;
  case 'list':
    notes.getAll();
    break;
  case 'remove':
    notes.removeNote(argv.title);
  default:
    console.log('Command not recognized');
}
