// Stocker les comptes dans localStorage
if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify([]));
  }
  
  // Gestion du formulaire de sign-up
  document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
  
    // Vérifier si l'utilisateur existe déjà
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const userExists = accounts.some(account => account.username === username);
  
    if (userExists) {
      alert('Ce nom d\'utilisateur est déjà pris.');
      return;
    }
  
    // Ajouter le nouvel utilisateur
    accounts.push({ username, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Compte créé avec succès !');
    document.getElementById('signupForm').reset();
  });
  
  // Gestion du formulaire de login
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    // Vérifier les informations de connexion
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const user = accounts.find(account => account.username === username && account.password === password);
  
    if (user) {
      alert('Connexion réussie !');
      localStorage.setItem('currentUser', JSON.stringify(user)); // Stocker l'utilisateur actuel
      window.location.href = 'dashboard.html'; // Redirection vers la nouvelle page
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  });