// Afficher la date et l'heure en temps réel
function updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.getElementById('dateTime');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    dateTimeElement.textContent = now.toLocaleDateString('fr-FR', options);
  }
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Afficher immédiatement
  
  // Gérer les tâches
  const taskInput = document.getElementById('taskInput');
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
        <span>${task.text} (à ${task.time})</span>
        <button onclick="deleteTask(${index})">Supprimer</button>
      `;
      taskList.appendChild(li);
    });
  }
  
  // Ajouter une tâche
  addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const time = taskTime.value;
    if (text && time) {
      tasks.push({ text, time });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
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