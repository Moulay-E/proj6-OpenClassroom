
import {filtrer,generationFigure, categorie} from "./component/filter.js";
import { fetchThemAll } from "./component/fetch.js";

const all = document.querySelector(".portfolio__btn__all");
const object = document.querySelector(".portfolio__btn__object");
const apartment = document.querySelector(".portfolio__btn__apartment");
const hotel = document.querySelector(".portfolio__btn__hotel");

let categorieData;
let work ;
const categorieUrl = 'http://localhost:5678/api/categories';
const workUrl = 'http://localhost:5678/api/works';

fetchThemAll(categorieUrl)
.then( data => {
    categorieData = data;
    console.log(categorieData);
    return categorieData;
});
fetchThemAll(workUrl)
.then( data =>  {
    work = data;
    console.log(work);
    console.log("generer base");
    //premiere generation depuis serveur
    generationFigure(work);
    return work;
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


Promise.all([fetchThemAll(categorieUrl), fetchThemAll(workUrl)])
  .then(data => {
    console.log("promise")
    const categorieData = data[0];
    const work = data[1];
    console.dir(categorieData);
    console.dir(work);
   const {obj, appt, hostel} =  categorie(categorieData);
   console.dir(obj +' '+ appt + ' '+  hostel);

    filtrer(object, [obj],work );
    filtrer(apartment, [appt],work );
    filtrer(hotel, [hostel],work );
    filtrer(all, [obj, appt, hostel],work );
  });

