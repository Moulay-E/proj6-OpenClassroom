
// import {filtrer,generationFigure, categorie} from "./component/filter.js";
import { fetchThemAll, fetchJson } from "./component/fetch.js";
import { openModal, closeModal } from "./component/modal.js";
import { logout} from "./component/login.js";

const all = document.querySelector(".portfolio__btn__all");
const object = document.querySelector(".portfolio__btn__object");
const apartment = document.querySelector(".portfolio__btn__apartment");
const hotel = document.querySelector(".portfolio__btn__hotel");

let token;
let categorieData;
const categorieUrl = 'http://localhost:5678/api/categories';
export const workUrl = 'http://localhost:5678/api/works';

//<----------------recovery and display of work------------------------------

function generationFigure(work, classe = ".gallery"){
  const gallery = document.querySelector(classe);
  gallery.innerHTML="";
      work.map(works => {
          const figure = document.createElement("figure");
          figure.innerHTML = 
          `<img src=${works.imageUrl} alt="image de ${works.title}>"
           <figcaption> ${works.title}</figcaption>`;
           gallery.appendChild(figure);
      })     
};
//recovery data from the api and use them
await fetchJson(workUrl)
.then(work => {
  console.log(work , "www");
  generationFigure(work);
  generationFigure(work, ".modal__galery")
});

//<----------------recovery and display of categories------------------------------
//use map to compare the different elements of the object to check
// whether they exist in the array and assign them to the new object
function categorie(array) {
  const mappings = {
    Objets: "obj",
    Appartements: "appt",
    "Hotels & restaurants": "hostel"
  };

  const result = {};
  array.map(element => {
    const propertyName = mappings[element.name];
    propertyName && (result[propertyName] = element.id);
    console.log(propertyName + result[propertyName]);
  });

  return result;
};
//recovery data from the api and use them
await fetchJson(categorieUrl)
.then( data => {
    categorieData = data;
    console.log(categorieData);
    return categorieData;
});

//<---------------------FILTER Add Event on btn------------------------------
  // fetch data and launch filter function and button allocation
// creates clickable btn and filters the array to create a new one
// from this array, call the genererfigure function to 
// to update the display according to the desired filter
function filtrer(btn,categorie, array){
  btn.addEventListener("click",function(){
      const arrayFiltrer = array.filter(function(item){
          console.log(item.categoryId +"r");
          return categorie.includes(item.categoryId);
      })
      console.log(arrayFiltrer+ "tab");
      generationFigure(arrayFiltrer);
  })
};  
//when fetch sucessfull assign filter fonction to btn
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

//<---------------------LOGOUT & TOKEN------------------------------
//a ranger nettoyer et trier
token = localStorage.getItem('Token');
console.log(token);
const tokenValue = token.replace(/"/g,'');

function getTokenFromLocalStorage() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("Token");
    resolve(token);
  });
}

// login and logout use fonction from login.js
async function tokenRecuperation() {
  const token = await getTokenFromLocalStorage();
  localToken = token.replace(/"/g, '');
  console.log(localToken, 'string');
}
let localToken;

await tokenRecuperation();
await logout(localToken);

// gestion modal affiahe entre les deux modal
// function showAddPictureModal() {
//   const modal1 = document.querySelector(".modalUno");
//   const modal2 = document.querySelector(".modal2");
//   modal1.style.display = "none";
//   modal2.style.display = "flex";
// }
// function changeModal(){
//   const btnChange = document.querySelector(".addPicture-btn");
//   btnChange.addEventListener("click", (e)=>{
//     e.preventDefault();
//     showAddPictureModal();
//   })
// };
// changeModal();


//<---------------------changement modal------------------------------

let isModal1Visible = true;
const modal1 = document.querySelector(".modalUno");
const modal2 = document.querySelector(".modal2");


function toggleModals() {
  if (isModal1Visible) {
    modal1.style.display = "none";
    modal2.style.display = "block";
    isModal1Visible = false;
  } else {
    modal1.style.display = "grid";
    modal2.style.display = "none";
    isModal1Visible = true;
  }
};
const clickElements = document.querySelectorAll(".changeModal");
clickElements.forEach((element) => {
  element.addEventListener("click", toggleModals);
});
//<---------------------changement modal------------------------------







//call to the fonction open modal in modal.js
  document.querySelectorAll(".js-modal")
.forEach(a => {
    a.addEventListener("click", openModal)
});



// const tokenWait = localStorage.getItem('Token');
// console.log(tokenWait);
// const tokenValue = tokenWait.replace(/"/g,'');
// let tokenValue = localStorage.token;



let imageForm = "";
let categoryForm = "";
let titleForm;

const addTitle = document.getElementById("add-title");
const addCategorie = document.getElementById("add-categories");
const previewImg = document.querySelector(".preview-img");
const addImageModal = document.querySelector(".btn-addImage");
const addPicture = document.querySelector(".addPictures");

const imgContainer = document.querySelector(".img-container");







function addImage() {
  // Image
  addImageModal.addEventListener("input", (e) => {
    //console.log(addImageModal.files[0]);
    imageForm = e.target.files[0];
    const img = URL.createObjectURL(imageForm);
    previewImg.src = img;
    previewImg.style.setProperty("display", "block");
    imgContainer.style.setProperty("display", "none");
  });
  //Titre
  addTitle.addEventListener("input", (e) => {
    titleForm = e.target.value;
  });
  //Catégories
  addCategorie.addEventListener("input", (e) => {
    categoryForm = e.target.selectedIndex;
  });
  //Submit
  addPicture.addEventListener("submit", (e) => {
    e.preventDefault();
    if (imageForm && titleForm && categoryForm) {
      const formData = new FormData();
      console.log(imageForm, titleForm, categoryForm);
      formData.append("image", imageForm);
      formData.append("title", titleForm);
      formData.append("category", categoryForm);
      console.log(formData.entries());
      //Fetch ajout des travaux
      fetch("http://" + window.location.hostname +":5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          errorAdd.innerText = "Posté !";
          errorAdd.style.color = "green";
          //Clear les galleries
          gallery.innerHTML = "";
          modalGallery.innerHTML = "";
          fetchGet();
          addPicture.reset();
          previewImg.src = "";
          previewImg.style.setProperty("display", "none");
          imgContainer.style.setProperty("display", "flex");
          setTimeout(() => {
            errorAdd.innerText = "";
          }, 4000);
        })
        .catch((err) =>
          console.log("Il y a eu une erreur sur le Fetch: " + err)
        );
    } else {
      errorAdd.innerText = "Veuillez remplir tous les champs.";
      errorAdd.style.color = "red";
      setTimeout(() => {
        errorAdd.innerText = "";
      }, 4000);
      console.log("Tous les champs ne sont pas remplis !");
    }
  });
}

addImage();


