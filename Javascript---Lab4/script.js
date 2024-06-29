document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notes');
    const searchInput = document.getElementById('search');
  
    loadNotes();
  
    noteForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const noteIndex = document.getElementById('noteIndex').value;
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const color = document.getElementById('color').value;
      const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
      const pin = document.getElementById('pin').checked;
      const date = new Date().toLocaleString();
  
      const note = {
        title,
        content,
        color,
        tags,
        pin,
        date
      };
  
      if (noteIndex === '') {
        saveNoteToLocalStorage(note);
      } else {
        updateNoteInLocalStorage(noteIndex, note);
      }
  
      loadNotes();
      noteForm.reset();
      document.getElementById('noteIndex').value = '';
    });
  
    searchInput.addEventListener('input', function() {
      loadNotes(this.value.toLowerCase());
    });
  
    function saveNoteToLocalStorage(note) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function updateNoteInLocalStorage(index, updatedNote) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes[index] = updatedNote;
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function loadNotes(searchQuery = '') {
      notesContainer.innerHTML = '';
  
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
      if (searchQuery) {
        notes = notes.filter(note => {
          const searchText = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
          return searchText.includes(searchQuery);
        });
      }
  
      notes.sort((a, b) => b.pin - a.pin || new Date(b.date) - new Date(a.date));
  
      notes.forEach((note, index) => {
        addNoteToContainer(note, index);
      });
    }
  
    function addNoteToContainer(note, index) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.style.backgroundColor = note.color;
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = note.title;
  
      const contentElement = document.createElement('p');
      contentElement.textContent = note.content;
  
      const tagsElement = document.createElement('p');
      tagsElement.textContent = note.tags ? `Tags: ${note.tags.join(', ')}` : '';
  
      const dateElement = document.createElement('small');
      dateElement.textContent = `Created: ${note.date}`;
  
      const pinElement = document.createElement('p');
      pinElement.textContent = `Pinned: ${note.pin}`;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        editNote(note, index);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteNoteFromLocalStorage(index);
        loadNotes();
      });
  
      noteElement.appendChild(titleElement);
      noteElement.appendChild(contentElement);
      noteElement.appendChild(tagsElement);
      noteElement.appendChild(dateElement);
      noteElement.appendChild(pinElement);
      noteElement.appendChild(editButton);
      noteElement.appendChild(deleteButton);
  
      notesContainer.appendChild(noteElement);
    }
  
    function editNote(note, index) {
      document.getElementById('noteIndex').value = index;
      document.getElementById('title').value = note.title;
      document.getElementById('content').value = note.content;
      document.getElementById('color').value = note.color;
      document.getElementById('tags').value = note.tags.join(',');
      document.getElementById('pin').checked = note.pin;
    }
  
    function deleteNoteFromLocalStorage(index) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  });
  