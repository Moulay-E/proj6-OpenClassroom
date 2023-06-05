
import {filtrer,generationFigure, categorie} from "./component/filter.js";
import { fetchThemAll, fetchJson } from "./component/fetch.js";
import { openModal, closeModal } from "./component/modal.js";
import { logout} from "./component/login.js";

const all = document.querySelector(".portfolio__btn__all");
const object = document.querySelector(".portfolio__btn__object");
const apartment = document.querySelector(".portfolio__btn__apartment");
const hotel = document.querySelector(".portfolio__btn__hotel");

let localToken;
let categorieData;
const categorieUrl = 'http://localhost:5678/api/categories';
const workUrl = 'http://localhost:5678/api/works';

//recovery data from the api and use them
await fetchJson(categorieUrl)
.then( data => {
    categorieData = data;
    console.log(categorieData);
    return categorieData;
});

await fetchJson(workUrl)
.then(work => {
  console.log(work , "www");
  generationFigure(work);
})

  // fetch data and launch filter function and button allocation
Promise.all([fetchJson(categorieUrl), fetchJson(workUrl)])
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
//call to the fonction open modal in modal.js
  document.querySelectorAll(".js-modal")
.forEach(a => {
    a.addEventListener("click", openModal)
});

function getTokenFromLocalStorage() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("Token");
    resolve(token);
  });
}

// login and logout use fonction from login.js
async function tokenRecuperation() {
  const token = await getTokenFromLocalStorage();
  localToken = token;
  console.log(localToken, 'string');
}

await tokenRecuperation();
await logout(localToken);


