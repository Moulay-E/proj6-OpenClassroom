
import {filtrer,generationFigure, categorie} from "./component/filter.js";

const all = document.querySelector(".portfolio__btn__all");
const object = document.querySelector(".portfolio__btn__object");
const apartment = document.querySelector(".portfolio__btn__apartment");
const hotel = document.querySelector(".portfolio__btn__hotel");




// let chemin = http://localhost:5678/
let categorieData;
let work ;
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    // Traitez les données reçues du serveur ici
    console.log(data);
    return categorieData = data;
   
//    filtrer(apartment, [appt],work );
//   filtrer(hotel, [hostel],work );
  })
  .catch(error => {
    // Gérez les erreurs ici
    console.error(error);
  });


  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Traitez les données reçues du serveur ici
    work = data;
    generationFigure(work);
      filtrer(object, [obj],work );
    // filtrer(object, [1],work );
    // filtrer(apartment, [2],work );
    // filtrer(hotel, [3],work );
    // filtrer(all, [1,2,3],work );
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

  



