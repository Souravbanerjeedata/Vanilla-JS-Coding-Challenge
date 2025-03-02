const addNoteBtn = document.getElementById('btn');
const noteContainer = document.querySelector('.notes');
let notes;

// save history on the browser
function updateStorage() {
  localStorage.setItem('notes', noteContainer.innerHTML);
}

// save and update if revisiting or reloading
function showNotes() {
  noteContainer.innerHTML = localStorage.getItem('notes');
}

showNotes();

// adding the notes upon every click of the create note button
addNoteBtn.addEventListener('click', function () {
  let noteInput = document.createElement('p');
  noteInput.classList.add('input');
  noteInput.setAttribute('contentEditable', 'true');
  let img = document.createElement('img');
  img.src = './images/delete.png';
  noteContainer.appendChild(noteInput).appendChild(img);
});

// delete note on delete icon click
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.parentElement.remove();
    updateStorage();
  }
  // after every key press / changes the update would be saved
  else if (e.target.tagName === 'P') {
    notes = document.querySelectorAll('.input');
    notes.forEach((note) => {
      note.onkeyup = () => {
        updateStorage();
      };
    });
  }
});

// when writing a note for each enter key new line is created inside note
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.execCommand('insertLineBreak');
    event.preventDefault();
  }
});
