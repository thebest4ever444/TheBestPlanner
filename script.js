// Récupérer les utilisateurs depuis localStorage ou initialiser un tableau vide
let users = JSON.parse(localStorage.getItem('users')) || [];

// Gestion de l'inscription
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    // Vérifier si l'utilisateur existe déjà
    const userExists = users.some(u => u.username === newUsername);
    if (userExists) {
        alert('Ce nom d\'utilisateur est déjà pris.');
        return;
    }

    // Ajouter le nouvel utilisateur
    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users)); // Sauvegarder dans localStorage
    alert('Inscription réussie! Veuillez vous connecter.');
    window.location.href = 'index.html';
});

// Gestion de la connexion
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Vérifier les identifiants
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', username); // Stocker l'utilisateur connecté
        window.location.href = 'dashboard.html';
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
});

// Afficher le nom d'utilisateur sur le dashboard
const usernameDisplay = document.getElementById('usernameDisplay');
if (usernameDisplay) {
    const currentUser = localStorage.getItem('currentUser');
    usernameDisplay.textContent = currentUser;
}

// Déconnexion
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Mise à jour de la date et de l'heure en temps réel
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const now = new Date();
        datetimeElement.textContent = now.toLocaleString();
    }
}
setInterval(updateDateTime, 1000);

// Gestion des notes dans le planner
document.getElementById('noteForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const note = document.getElementById('note').value.trim();
    const noteDateTime = document.getElementById('noteDateTime').value;
    if (!note || !noteDateTime) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    alert('Note ajoutée pour le ' + noteDateTime + ': ' + note);
    // Ici, vous pourriez ajouter la logique pour sauvegarder la note
});

// Sauvegarder les notes dans localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Ajouter une nouvelle note
document.getElementById('noteForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const noteText = document.getElementById('note').value.trim();
    const noteDateTime = document.getElementById('noteDateTime').value;

    if (!noteText || !noteDateTime) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Créer un objet note
    const newNote = {
        text: noteText,
        dateTime: noteDateTime,
        id: Date.now() // Utiliser un timestamp comme ID unique
    };

    // Ajouter la note au tableau
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes)); // Sauvegarder dans localStorage

    // Réinitialiser le formulaire
    document.getElementById('noteForm').reset();

    // Afficher les notes
    displayNotes();
});

// Afficher les notes
function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) return;

    // Vider le contenu actuel
    notesContainer.innerHTML = '';

    // Trier les notes par date et heure
    notes.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    // Afficher chaque note
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <strong>${new Date(note.dateTime).toLocaleString()}</strong>
            <p>${note.text}</p>
            <button onclick="deleteNote(${note.id})">Supprimer</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Supprimer une note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes)); // Mettre à jour localStorage
    displayNotes(); // Rafraîchir l'affichage
}

// Charger les notes au chargement de la page
window.onload = function() {
    displayNotes();
    updateDateTime();
};