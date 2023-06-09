import { fetchThemAll } from "./fetch.js";
import { localToken, workUrl } from "../script.js";

// close and open modal on click 
export let modal = null;
const focusableSelector = "button, a , input, textarea";
let focusables = [];
let previouslyFocused = null;

export const openModal = (e)=>{
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

export const closeModal = (e) =>{
    if(modal === null) return;
    if(previouslyFocused !== null) previouslyFocused.focus();
    e.preventDefault();
    window.setTimeout(()=>{
        modal.style.display = "none";
        modal = null;
    }, 500)
    // modal.addEventListener("animationend", ()=> {
    //     modal.style.display = "none";
    //     modal = null;
    // })
    // modal.setAttribute("aria-hidden", true);
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


// const imgInput = document.querySelector("#upload");
// imgInput.addEventListener("change", (e)=> {
//     const file = e.target.file[0];
//     if(file){
//         const reader = new FileReader;
//         reader.onload = (e)=> {
//             const imageUrl = e.target.result;
//             const imageElement = document.createElement("img");
//             imageElement.src = imageUrl;

//             const modalImg = document.querySelector(".modal__galery");
//             modalImg.appendChild(imageElement);
//         }
//         reader.readAsDataURL(file);
//     }
// })

// document.addEventListener('DOMContentLoaded', () => {
  // Votre code ici
  function addImageModal(){
      console.log(document.querySelector("#upload"));
      const imgInput = document.querySelector("#upload");
      imgInput.addEventListener("change", (e)=> {
          const file = e.target.files[0];
          console.log(file,"fillllee");  
          if(file){
              const reader = new FileReader();
              reader.onload = (e)=> {
                  const imageUrl = e.target.result;
                  // console.dir(imageUrl, "voici");
                  const imageElement = document.createElement("img");
                  imageElement.src = imageUrl;
                
                  const modalImg = document.querySelector(".modal__galery");
    
                  const figure = document.createElement("figure");
                  const test = document.createElement("figcaption");
                  test.innerHTML='<p>fhsfhd</p>';
                  figure.appendChild(imageElement);
                  figure.appendChild(test);
    
                  modalImg.appendChild(figure);
              }
              reader.readAsDataURL(file);
          }
      })
  }
  addImageModal();

  async function addImageServ(url, dataToPost){
    
    let test=  await fetchThemAll(url,dataToPost);
    console.log(test);

}

  function validerImgs(){
    const formElem = document.querySelector(".formAddPhoto");
    formElem.addEventListener("submit", e =>{
        e.preventDefault();
        // const dataForm = new FormData(formElem);
        const data = new FormData();
        // const data = Object.fromEntries(dataForm);
        
        
        const title = document.querySelector('#title');
        const cate = document.querySelector("#categorie")
        const imgInput = document.querySelector("#upload");
        const imagefile = imgInput.files[0];
        
        data.append("image", imagefile);
        data.append("title", title.value);
        data.append("category", cate.value);

        // const imgInput = document.querySelector("#upload");
        // const imagefile = imgInput.files[0];
        // data.image = imagefile;
        console.log(data);
        // console.log(data.form__title)

        // const imageToPost = {
        //     "title": data.form__title,
        //     "imageUrl": data.image,
        //     "categoryId": data.form__categorie,
        //   }

        //   console.log(imageToPost, 'hoho')
          const tokenString = localStorage.getItem('Token');
          console.log(tokenString,"token extrait");
        //   console.log(imageToPost,"le body");

          const imageFetchPara = {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                // Accept: 'application/json',
                Authorization: `Bearer ${tokenString}`,
            },
            body: data,
          };
          

        addImageServ(workUrl, imageFetchPara);

    })
  }
  validerImgs()
function test() {
    const imageToPost = {
        "title": "bblbllb",
        "imageUrl": "shfsjfjsls",
        "categoryId": "hshjhskhfks",
      }
      const tokenString = 
      {"userId":1,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NjMwNzgwNywiZXhwIjoxNjg2Mzk0MjA3fQ.zResFeDpEDK8u4fo785N4YdK1C5_glhKbhP6ORIsetc"} ;
    //   localStorage.getItem('Token');
    const testPara = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${tokenString}`,
      },
      body: imageToPost,
    };
    addImageServ('http://localhost:5678/api/works', testPara).then((response)=>{
        console.log(response)
    })

}
 test();

//   async function getTokenFromLocalStorage() {
//     return new Promise((resolve, reject) => {
//       const token = localStorage.getItem("Token");
//       resolve(token);
//     })
//   };
//   async function tokenRecuperation() {
//     const token = await getTokenFromLocalStorage();
//     localToken = token;
//     console.log(localToken, 'string');
//   }
//     let Token = await getTokenFromLocalStorage()
//     console.log(Token, 'hihi');
//   S0phie
// async function tokk(test){
// let tokens = await localToken;
//     console.log(tokens);
// }
// tokk(localToken);
// });
// const gallery = document.querySelector(classe);
            
// const figure = document.createElement("figure");

// const img = document.createElement("img");
// img.src = element.imageUrl;

// const figTxt = document.createElement("figcaption");
// figTxt.innerText = element.title;

// // on rattaache tous sa et l'organise
// figure.appendChild(img);
// figure.appendChild(figTxt);
// gallery.appendChild(figure);

