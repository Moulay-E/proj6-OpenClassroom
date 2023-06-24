
import { fetchJson } from "./lib/fetch.js";

const categorieUrl = 'http://localhost:5678/api/categories';
 const workUrl = 'http://localhost:5678/api/works';

//<----------------recovery and display of work------------------------------
const gallery = document.querySelector(".gallery");
function generationFigure(work){
  gallery.innerHTML="";
      work.map(works => {
          const figure = document.createElement("figure");
          figure.setAttribute("id", `${works.id}.`);
          figure.innerHTML = 
          `<img src=${works.imageUrl} alt="image de ${works.title}>"
           <figcaption> ${works.title}</figcaption>`;
           gallery.appendChild(figure);
      })     
};

/////////////////////////////////////////////////////////////////
const modalGallery = document.querySelector(".modal__gallery__work");
function workGallery(works) {
  works.map((work) => {
    const workPost = document.createElement("figure");
    workPost.setAttribute("id", `${work.id}`);
    workPost.innerHTML = `
      <i id="${work.id}"  class="fa-solid fa-trash-can trash-icon" ></i>
      <img class="modal-image" src=${work.imageUrl} alt="image de ${work.title}">
    <figcaption>éditer</figcaption> 
    `;
    modalGallery.appendChild(workPost);

    //u can find this fonction ligne 371
    deleteImage(workPost);
  });
}
//recovery data from the api and use them
async function fetchWorkGenerateGaleryAndModal(){
  await fetchJson(workUrl)
  .then(work => {
    console.log(work , "www");
    generationFigure(work);
    workGallery(work);
    // generationFigure(work, ".modal__galery")
  });
};
fetchWorkGenerateGaleryAndModal();

//<----------------recovery and display of categories------------------------------
//use map to compare the different elements of the object to check
// whether they exist in the array and assign them to the new object
const allBtn = document.querySelector(".portfolio__btn__all");
const object = document.querySelector(".portfolio__btn__object");
const apartment = document.querySelector(".portfolio__btn__apartment");
const hotel = document.querySelector(".portfolio__btn__hotel");

let categorieData;
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
    filtrer(allBtn, [obj, appt, hostel],work );
  });

//<---------------------LOGOUT & TOKEN------------------------------

const formatTokenFromLocalStorage = () => 
localStorage.getItem("Token") ? localStorage.getItem("Token").replace(/"/g, '') : null;

let tokens = formatTokenFromLocalStorage(); 
console.log(tokens)

  function logout (tokens){
    const modalOpening = document.querySelectorAll(".edit--display");  const editor = document.querySelector(".editor");
  const btnContainer = document.querySelector(".portfolio__btn");
  const headerUl = document.querySelector("header > nav > ul");
  const logoutHtml = headerUl.children[2];
  
  function suppr (e){
    e.preventDefault();
    //style
    modalOpening.forEach((modal) => {
      modal.style.display = "none";
    });
    editor.style.setProperty("display", "none");
    btnContainer.style.setProperty("display", "flex");
    //
    localStorage.removeItem("Token");
    tokens = null;
    console.log(tokens, "test")
    logoutHtml.innerText = "login";
    logoutHtml.removeEventListener("click", suppr);
  }
  if (tokens !== null && tokens !== undefined){
    //style
    modalOpening.forEach((modal) => {
      modal.style.display = "flex";
    });
    editor.style.setProperty("display", "flex");
    btnContainer.style.setProperty("display", "none");
    //
    logoutHtml.innerText = "Logout";
    logoutHtml.addEventListener("click", suppr); 
  }
};
logout(tokens);

//<---------------------MODAL BOX------------------------------

let modal = null;
const focusableSelector = "button, a , input, textarea";
let focusables = [];
let previouslyFocused = null;

 const openModal = (e)=>{
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    console.log(modal, "test")
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocused = document.querySelector(":focus");
    focusables[0].focus();
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", true);
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close")
    .addEventListener("click",closeModal);
    modal.querySelector(".js-modal-stop")
    .addEventListener("click",stopPropagation);
};

const closeModal = (e) =>{
    if(modal === null) return;
    if(previouslyFocused !== null) previouslyFocused.focus();
    e.preventDefault();
    window.setTimeout(()=>{
        modal.style.display = "none";
        modal = null;
    }, 500)
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close")
    .removeEventListener("click",closeModal);
    modal.querySelector(".js-modal-stop")
    .removeEventListener("click",stopPropagation); 
}
const stopPropagation = (e) => {
    e.stopPropagation();
}

document.querySelectorAll(".js-modal")
.forEach(a => {
    a.addEventListener("click", openModal)
});

// navigat in the modal with keyborad
const focusInModal = (e) => {
    e.preventDefault();
    let index = focusables.findIndex(
        f => f === modal.querySelector(":focus"));
    console.log(index);
    if(e.shiftKey === true){
        index--;
    }
    else{
        index++;
    }
    if(index >= focusables.length){
        index = 0;
    }
    if(index < 0){
        index = focusables.length-1;
    }
    focusables[index].focus();
}

window.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key === "Escape" || e.key === "Esc" ){
        closeModal(e);
    }
    if(e.key === "Tab" && modal !== null){
        focusInModal(e);
    }
})

//<---------------------changement de modal------------------------------

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
//<-------------------- Add Image With Modal------------------------------

let imageForm = "";
let categoryForm = "";
let titleForm;

const addTitle = document.getElementById("add-title");
const addCategorie = document.getElementById("add-categories");
const previewImg = document.querySelector(".preview-img");
const addImageModal = document.querySelector(".btn-addImage");
const addPicture = document.querySelector(".addPictures");
const imgContainer = document.querySelector(".img-container");
const errorAdd = document.querySelector(".error-add");

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
          Authorization: `Bearer ${tokens}`,
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
          fetchWorkGenerateGaleryAndModal();
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

//<--------------------- Delete------------------------------

const fetchDelete = async (id) => {
  try {
    const response = await fetch(`http://${window.location.hostname}:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("La suppression a échoué.");
    }
  } catch (error) {
    console.log("Il y a eu une erreur sur le Fetch: " + error);
  }
};

const deleteMsg = document.querySelector(".delete-msg");

function deleteImage(imgValue) {
  const deleteIcon = document.querySelectorAll(".trash-icon");
  deleteIcon.forEach((delIcon) => {
    delIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = parseInt(e.target.id);
      const idRemove = document.getElementById(e.target.id);
      const portfolioRemove = document.getElementById(e.target.id + ".");
      try {
        await fetchDelete(id);
        idRemove.parentNode.removeChild(idRemove); // Supprimer l'élément du DOM
        portfolioRemove.remove();
        deleteMsg.style.setProperty("top", "0");
        deleteMsg.innerText = "Supprimé !";
        setTimeout(() => {
          deleteMsg.innerText = "";
          deleteMsg.style.setProperty("top", "-25px");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    });
  });
}
