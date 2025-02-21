// Afficher la date et l'heure en temps réel
function updateDateTime() {
  const now = new Date();
  const dateTimeElement = document.getElementById('dateTime');

  // Options pour formater la date et l'heure
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Lundi")
    year: 'numeric', // Année (ex: "2023")
    month: 'long',   // Mois (ex: "octobre")
    day: 'numeric',  // Jour du mois (ex: "23")
    hour: '2-digit', // Heure (ex: "14")
    minute: '2-digit', // Minute (ex: "05")
    second: '2-digit', // Seconde (ex: "09")
  };

  // Formater la date et l'heure
  const formattedDateTime = now.toLocaleDateString('fr-FR', options);
  dateTimeElement.textContent = formattedDateTime;
}

// Mettre à jour la date et l'heure toutes les secondes
setInterval(updateDateTime, 1000);

// Afficher immédiatement la date et l'heure au chargement de la page
updateDateTime();

// Gérer les tâches
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Charger les tâches depuis le localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Afficher les tâches
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text} (le ${task.date} à ${task.time})</span>
      <button onclick="deleteTask(${index})">Supprimer</button>
    `;
    taskList.appendChild(li);
  });
}

// Ajouter une tâche
addTaskButton.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (text && date && time) {
    tasks.push({ text, date, time });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    renderTasks();
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});

// Supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Afficher les tâches au chargement de la page
renderTasks();
