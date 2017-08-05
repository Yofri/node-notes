// required to write file system
const fs = require('fs');

let fetchNotes = () => {
  try {
    // read file
    let noteString = fs.readFileSync('notes-data.json');
    // return parsed JSON
    return JSON.parse(noteString);
  } catch (err) {
    return [];
  }
};

let saveNotes = (notes) => {
  // saving stringified notes
  return fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
  // fetch all notes
  let notes = fetchNotes();
  let note = {
    // es6 syntax
    title,
    body
  };

  // check for duplicate
  let duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note); // save to variable note
    saveNotes(notes); // save to file system
    console.log('Note successfully created');
    logNote(note);
    return note; // returning note title & body
  } else {
    console.log('Note already exists');
  }
};

let getAll = () => {
  // returning all notes
  let allNotes = fetchNotes();
  console.log(`Printing ${allNotes.length} note(s).`)
  return allNotes.forEach(note => logNote(note));
};

let readNote = (title) => {
  // fetching all notes
  let notes = fetchNotes();
  // returning note with same title
  let filteredNotes = notes.filter(note => note.title === title);

  if (filteredNotes) {
    console.log('Here the note');
    logNote(filteredNotes[0]);
  } else {
    console.log('Missing note');
  }

  // returning note with index 0
  return filteredNotes[0];
}

let removeNote = (title) => {
  // fetching all notes
  let notes = fetchNotes();
  // check all note whose title is different
  let filteredNotes = notes.filter(note => note.title !== title);
  // save note with title different with passed arguments
  saveNotes(filteredNotes);

  (notes.length !== filteredNotes.length) ?
   console.log('Note was removed') : console.log('Note is missing')
}

// DRY purpose, extracting reused code
let logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
};
