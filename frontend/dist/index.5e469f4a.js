document.addEventListener("DOMContentLoaded", fetchNotes);
async function fetchNotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const response = await fetch("http://localhost:4000/notes");
    const data = await response.json();
    let notesHtml = "";
    data.forEach((note)=>{
        let categoryClass = [
            "tugas",
            "hutang",
            "kerja",
            "penting"
        ].includes(note.category) ? note.category : "lainnya";
        if (selectedCategory && categoryClass !== selectedCategory) return;
        const updatedAtWIB = luxon.DateTime.fromISO(note.updatedAt, {
            zone: 'utc'
        }).setZone('Asia/Jakarta').toFormat('dd MMMM yyyy HH:mm:ss');
        notesHtml += `
            <div class="note-card ${categoryClass}">
                <h3 class="note-title">${note.title}</h3>
                <p class="note-content">${note.content}</p>
                <p class="note-updated">Updated: ${updatedAtWIB} WIB</p>
                <div class="note-buttons">
                    <button class="edit-btn" onclick="editNote('${note.id}')">
                        <img src="assets/edit.png" alt="Edit" class="icon"> Edit
                    </button>
                    <button class="delete-btn" onclick="deleteNote(${note.id})">
                        <img src="assets/delete.png" alt="Delete" class="icon"> Delete
                    </button>
                </div>
            </div>`;
    });
    document.getElementById("notesContainer").innerHTML = notesHtml;
}
function editNote(id) {
    console.log("Editing note with ID:", id); // Debugging
    window.location.href = `edit_note.html?id=${id}`;
}
async function deleteNote(id) {
    if (confirm("Yakin ingin menghapus catatan?")) {
        await fetch(`http://localhost:4000/delete-notes/${id}`, {
            method: "DELETE"
        });
        fetchNotes();
    }
}

//# sourceMappingURL=index.5e469f4a.js.map
