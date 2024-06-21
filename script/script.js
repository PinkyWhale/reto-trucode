document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const createButton = document.getElementById('createButton');
    const notesContainer = document.getElementById('notesContainer');

    // cargar el localstorage por si hay notas ya creadas anteriormente
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNoteToDOM(note));

    createButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        
        if (noteText) {
            const note = { text: noteText, id: Date.now() };
            savedNotes.push(note);
            localStorage.setItem('notes', JSON.stringify(savedNotes));
            addNoteToDOM(note);
            noteInput.value = ''; // bug de multiples notas
        }
    });

    notesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton')) {
            const noteId = e.target.parentElement.getAttribute('data-id');
            const noteIndex = savedNotes.findIndex(note => note.id == noteId);
            
            if (noteIndex !== -1) {
                savedNotes.splice(noteIndex, 1);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                e.target.parentElement.remove();
            }
        }
    });

    function addNoteToDOM(note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-id', note.id);
        noteElement.innerHTML = `
            <span>${note.text}</span>
            <button class="deleteButton">Borrar</button>
        `;
        notesContainer.appendChild(noteElement);
    }
});
