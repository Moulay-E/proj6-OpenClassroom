
// let chemin = http://localhost:5678/

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    // Traitez les données reçues du serveur ici
    console.log(data);
  })
  .catch(error => {
    // Gérez les erreurs ici
    console.error(error);
  });


  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Traitez les données reçues du serveur ici
    console.log(data);
  })
  .catch(error => {
    // Gérez les erreurs ici
    console.error(error);
  });


  const autentification = {
    "email": "sophie.bluel@test.tld",
    "password": "S0phie"
  };
  let tokens;
  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(autentification)
  })
  .then(response => response.json())
  .then(data => {
    // Traitez les données reçues du serveur ici
    tokens = data;
    console.log(data);
    console.log(tokens.token+' voici le token ')
  })
  .catch(error => {
    // Gérez les erreurs ici
    console.error(error);
  });


