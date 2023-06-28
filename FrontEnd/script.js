import { fetchJson } from "./lib/fetch.js";

// Exemple de création d'un cookie avec SameSite=None et Secure

const categorieUrl = "http://localhost:5678/api/categories";
const workUrl = "http://localhost:5678/api/works";

//<----------------recovery and display of work------------------------------
const gallery = document.querySelector(".gallery");
function generationFigure(work) {
  gallery.innerHTML = " ";
  work.map((works) => {
    const figure = document.createElement("figure");
    figure.setAttribute("id", `${works.id}.`);
    figure.innerHTML = `<img src=${works.imageUrl} alt="image de ${works.title}>"
           <figcaption> ${works.title}</figcaption>`;
    gallery.appendChild(figure);
  });
}

/////////////////////////////////////////////////////////////////
const modalGallery = document.querySelector(".modal__gallery__work");
function generateModalGallery(works) {
  modalGallery.innerHTML = "";
  works.map((work) => {
    const workPost = document.createElement("figure");
    workPost.setAttribute("id", `${work.id}`);
    workPost.innerHTML = `
      <i id="${work.id}"  class="fa-solid fa-trash-can trash-icon" ></i>
      <img class="modal-image" src=${work.imageUrl} alt="image de ${work.title}">
    <figcaption>éditer</figcaption> 
    `;
    modalGallery.appendChild(workPost);
    deleteImage(workPost);
  });
}
//recovery data from the api and use them
async function fetchWorkGenerateGaleryAndModal() {
  await fetchJson(workUrl).then((work) => {
    generationFigure(work);
    generateModalGallery(work);
    // console.log(work , " work on fetchWorkGenreate");
  });
}
fetchWorkGenerateGaleryAndModal();

//<----------------recovery and display of categories------------------------------
//use map to compare the different elements of the object to check
// whether they exist in the array and assign them to the new object
const allBtn = document.querySelector(".portfolio__btn__all");
const objectBtn = document.querySelector(".portfolio__btn__object");
const apartmentBtn = document.querySelector(".portfolio__btn__apartment");
const hotelBtn = document.querySelector(".portfolio__btn__hotel");

let filtre;

let categorieData;
function categorieAddToSet(array) {
  filtre = new Set();
  array.map((f) => {
    filtre.add(f);
  });
  const filtrerdArray = Array.from(filtre);
  return filtrerdArray;
  // console.log(filtrerdArray, " un test filtre")
}

//recovery data from the api and use them
async function fetchCategory() {
  await fetchJson(categorieUrl).then((data) => {
    categorieData = data;
    return categorieData;
    // console.log(categorieData, " categorie on fetchCategory");
  });
}
fetchCategory();

//<---------------------FILTER Add Event on btn------------------------------
//Fetch data, apply filtering, and assign buttons to the corresponding functions, then update the gallery using the filtered array.
function filtrer(btn, categorie, array) {
  btn.addEventListener("click", function () {
    const arrayFiltrer = array.filter(function (item) {
      return categorie.includes(item.categoryId);
    });
    generationFigure(arrayFiltrer);
    // console.log(arrayFiltrer+ " arrayFiltrer on filtrer");
  });
}
function fetchAndFilterData() {
  Promise.all([fetchJson(categorieUrl), fetchJson(workUrl)]).then((data) => {
    console.log("promise");
    const categorieData = data[0];
    const work = data[1];
    const categorieResultArray = categorieAddToSet(categorieData);
    const [obj, appt, hostel] = categorieResultArray;

    filtrer(objectBtn, [obj.id], work);
    filtrer(apartmentBtn, [appt.id], work);
    filtrer(hotelBtn, [hostel.id], work);
    filtrer(allBtn, [obj.id, appt.id, hostel.id], work);

    // console.log("categorie: ", categorieData, ' work:' , work);
    // console.log(categorieResultArray,' categorieResultArray on fetchAndFilterData')
    // console.log(`${obj.id} ${appt.id} ${hostel.id}`, "destructuration on fetchAndFilterData");
  });
}
fetchAndFilterData();
//when fetch sucessfull assign filter fonction to btn

//<---------------------LOGOUT & TOKEN------------------------------
const formatTokenFromLocalStorage = () =>
  localStorage.getItem("Token")
    ? localStorage.getItem("Token").replace(/"/g, "")
    : null;

let tokens = formatTokenFromLocalStorage();

function logout(tokens) {
  const modalOpening = document.querySelectorAll(".edit--display");
  const editor = document.querySelector(".editor");
  const btnContainer = document.querySelector(".portfolio__btn");
  const headerUl = document.querySelector("header > nav > ul");
  const logoutHtml = headerUl.children[2].querySelector("a");

  function suppr(e) {
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
    logoutHtml.innerText = "login";
    logoutHtml.removeEventListener("click", suppr);
  }
  if (tokens !== null && tokens !== undefined) {
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
}
logout(tokens);

//<---------------------MODAL BOX------------------------------
let modal = null;
const focusableSelector = "button, a , input, textarea";
let focusables = [];
let previouslyFocused = null;

const openModal = (e) => {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocused = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
  if (modal === null) return;
  if (previouslyFocused !== null) previouslyFocused.focus();
  e.preventDefault();
  window.setTimeout(() => {
    modal.style.display = "none";
    modal = null;
  }, 500);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};
const stopPropagation = (e) => {
  e.stopPropagation();
};
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
//out of the modal
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  // console.log(e.key);
});

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
}
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
const submitBtn = document.querySelector(".validate-btn");

function BtnValidateGreen() {
  if (imageForm && titleForm && categoryForm) {
    submitBtn.style.background = "#1D6154";
  }
}
function addImage() {
  // Image
  addImageModal.addEventListener("input", (e) => {
    imageForm = e.target.files[0];
    const img = URL.createObjectURL(imageForm);
    previewImg.src = img;
    previewImg.style.setProperty("display", "block");
    imgContainer.style.setProperty("display", "none");
    BtnValidateGreen();
  });
  //Titre
  addTitle.addEventListener("input", (e) => {
    titleForm = e.target.value;
    BtnValidateGreen();
  });
  //Catégories
  addCategorie.addEventListener("input", (e) => {
    categoryForm = e.target.selectedIndex;
    BtnValidateGreen();
  });
  //Submit
  addPicture.addEventListener("submit", (e) => {
    e.preventDefault();
    if (imageForm && titleForm && categoryForm) {
      const formData = new FormData();
      formData.append("image", imageForm);
      formData.append("title", titleForm);
      formData.append("category", categoryForm);
      // console.log(formData.entries());
      // console.log(imageForm, titleForm, categoryForm);

      submitBtn.style.background = "#A7A7A7";
      //Fetch add work
      fetch("http://" + window.location.hostname + ":5678/api/works", {
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
          //Clear of gallery
          // gallery.innerHTML = "";
          // modalGallery.innerHTML = "";
          fetchWorkGenerateGaleryAndModal();
          fetchAndFilterData();
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
    const response = await fetch(
      `http://${window.location.hostname}:5678/api/works/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("La suppression a échoué.");
    }
  } catch (error) {
    console.log("Il y a eu une erreur sur le Fetch: " + error);
  }
};

const deleteMsg = document.querySelector(".delete-msg");

function deleteImage() {
  const deleteIcon = document.querySelectorAll(".trash-icon");
  deleteIcon.forEach((delIcon) => {
    delIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = parseInt(e.target.id);
      const modalRemove = document.getElementById(e.target.id);
      const galleryRemove = document.getElementById(e.target.id + ".");
      try {
        await fetchDelete(id);
        // modalRemove.parentNode.removeChild(modalRemove);
        modalRemove.remove();
        galleryRemove.remove();
        fetchAndFilterData();
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
