// // import { fetchThemAll } from "./fetch.js";
// // import { localToken, workUrl } from "../script.js";

// // close and open modal on click 
// export let modal = null;
// const focusableSelector = "button, a , input, textarea";
// let focusables = [];
// let previouslyFocused = null;

// export const openModal = (e)=>{
//     e.preventDefault();
//     modal = document.querySelector(e.target.getAttribute("href"));
//     console.log(modal, "test")
//     focusables = Array.from(modal.querySelectorAll(focusableSelector));
//     previouslyFocused = document.querySelector(":focus");
//     focusables[0].focus();
//     modal.style.display = null;
//     modal.removeAttribute("aria-hidden");
//     modal.setAttribute("aria-modal", true);
//     modal.addEventListener("click", closeModal);
//     modal.querySelector(".js-modal-close")
//     .addEventListener("click",closeModal);
//     modal.querySelector(".js-modal-stop")
//     .addEventListener("click",stopPropagation);
// };

// export const closeModal = (e) =>{
//     if(modal === null) return;
//     if(previouslyFocused !== null) previouslyFocused.focus();
//     e.preventDefault();
//     window.setTimeout(()=>{
//         modal.style.display = "none";
//         modal = null;
//     }, 500)
//     // modal.addEventListener("animationend", ()=> {
//     //     modal.style.display = "none";
//     //     modal = null;
//     // })
//     // modal.setAttribute("aria-hidden", true);
//     modal.removeAttribute("aria-modal");
//     modal.removeEventListener("click", closeModal);
//     modal.querySelector(".js-modal-close")
//     .removeEventListener("click",closeModal);
//     modal.querySelector(".js-modal-stop")
//     .removeEventListener("click",stopPropagation);
   
// }

// const stopPropagation = (e) => {
//     e.stopPropagation();
// }

// document.querySelectorAll(".js-modal")
// .forEach(a => {
//     a.addEventListener("click", openModal)
// });

// // navigat in the modal with keyborad
// const focusInModal = (e) => {
//     e.preventDefault();
//     let index = focusables.findIndex(
//         f => f === modal.querySelector(":focus"));
//     console.log(index);
//     if(e.shiftKey === true){
//         index--;
//     }
//     else{
//         index++;
//     }
//     if(index >= focusables.length){
//         index = 0;
//     }
//     if(index < 0){
//         index = focusables.length-1;
//     }
//     focusables[index].focus();
// }

// window.addEventListener("keydown", function(e){
//     console.log(e.key);
//     if(e.key === "Escape" || e.key === "Esc" ){
//         closeModal(e);
//     }
//     if(e.key === "Tab" && modal !== null){
//         focusInModal(e);
//     }
// })


// // const imgInput = document.querySelector("#upload");
// // imgInput.addEventListener("change", (e)=> {
// //     const file = e.target.file[0];
// //     if(file){
// //         const reader = new FileReader;
// //         reader.onload = (e)=> {
// //             const imageUrl = e.target.result;
// //             const imageElement = document.createElement("img");
// //             imageElement.src = imageUrl;

// //             const modalImg = document.querySelector(".modal__galery");
// //             modalImg.appendChild(imageElement);
// //         }
// //         reader.readAsDataURL(file);
// //     }
// // })

// // document.addEventListener('DOMContentLoaded', () => {
//   // Votre code ici
// //   function addImageModal(){
// //       console.log(document.querySelector("#upload"));
// //       const imgInput = document.querySelector("#upload");
// //       imgInput.addEventListener("change", (e)=> {
// //           const file = e.target.files[0];
// //           console.log(file,"fillllee");  
// //           if(file){
// //               const reader = new FileReader();
// //               reader.onload = (e)=> {
// //                   const imageUrl = e.target.result;
// //                   // console.dir(imageUrl, "voici");
// //                   const imageElement = document.createElement("img");
// //                   imageElement.src = imageUrl;
                
// //                   const modalImg = document.querySelector(".modal__galery");
    
// //                   const figure = document.createElement("figure");
// //                   const test = document.createElement("figcaption");
// //                   test.innerHTML='<p>fhsfhd</p>';
// //                   figure.appendChild(imageElement);
// //                   figure.appendChild(test);
    
// //                   modalImg.appendChild(figure);
// //               }
// //               reader.readAsDataURL(file);
// //           }
// //       })
// //   }
// //   addImageModal();

// //   async function addImageServ(url, dataToPost){
    
// //     let test=  await fetchThemAll(url,dataToPost);
// //     console.log(test);

// //     }

// // function validerImgs() {
// //     const formElem = document.querySelector(".formAddPhoto");
// //     formElem.addEventListener("submit", async (e) => {
      
// //       e.preventDefault();
// //       const data = new FormData(formElem);
// //       // const dataForm = new FormData(formElem);
// //       // const data = Object.fromEntries(dataForm);
// //       const title = document.querySelector('#title').value;
// //       const cate = document.querySelector("#categorie").value;
// //       const imgInput = document.querySelector("#upload");
// //       const imagefile = imgInput.files[0];

// //       // const fileImg = fileInput.files[0];
// //       const titleImg = title.value;
// //       const categoryImg = cate.value;
  
   
// //       data.append("image", imagefile);
// //       data.append("title", titleImg);
// //       data.append("category", categoryImg);
// //       // data.image = imagefile;
// //   console.dir(data);
// //   console.log(data.entries());
// //   console.log(data.category);



// //       //  const imageToPost = {
// //       //       "title": data.form__title,
// //       //       "imageUrl": data.image,
// //       //       "categoryId": data.form__categorie,
// //       //     };
// //           // console.log(imageToPost)
// //           // JSON.stringify(imageToPost);
// //       const tokenWait = localStorage.getItem('Token');
// //       const tokenString = tokenWait.replace(/"/g,'');
// //       console.log(tokenWait, 'post');

// //       // const imageFetchPara = {
// //       //   method: "POST",
// //       //   headers: {
// //       //       "Accept": "application/json",
// //       //       "Content-Type": "multipart/form-data",
// //       //       'Authorization': `Bearer ${tokenString}`
// //       //   },
// //       //   body: data,
// //       // };


// //       // const getPostItemApi = async (formData) => {
// //       //   try {
// //       //     const response = await fetch("http://localhost:5678/api/works", {
// //       //       method: "POST",
// //       //       headers: {
// //       //         Authorization: `Bearer ${tokenString}`,
// //       //       },
// //       //       body:  formData,
// //       //     });

// //       //   } catch (error) {
// //       //     console.log(error);
// //       //   }
// //       // };
// //       const getPostItemApi = async (imageToPost) => {
// //         await fetch("http://localhost:5678/api/works", {
// //             method: "POST",
// //             headers: {
              
// //               Authorization: `Bearer ${tokenString}`,
// //             },
// //             body: imageToPost,
// //           })
          
// //           .then((response) => response.json())
// //           .then((res) => {
           
// //             console.log(res);
// //             debugger
// //           })
// //           .catch((err) => console.log("Il y a eu une erreur sur le Fetch: " + err));
     


// //     };  
// // getPostItemApi(data);

  
//     //   const url = 'http://localhost:5678/api/works';
//     //   const response = await fetchThemAll(url, imageFetchPara);
  
//     //   if (response.ok) {
//     //     // Le formulaire a été envoyé avec succès
//     //     console.log('Formulaire envoyé avec succès');
//     //     // Fais ici ce que tu veux après l'envoi du formulaire, par exemple, affiche un message de succès ou effectue une redirection.
//     //   } else {
//     //     // Il y a eu une erreur lors de l'envoi du formulaire
//     //     console.log('Erreur lors de l\'envoi du formulaire');
//     //     // Gère l'erreur de la manière appropriée, par exemple, affiche un message d'erreur à l'utilisateur.
//     //   }
// //     });
// //   };
// //   validerImgs();

// //   function testPost(){
// //     const tokenWait = localStorage.getItem('Token');
// //     const tokenString = tokenWait.replace(/"/g,'');
// //     const btn = document.querySelector(".editor__btn");
// //     btn.addEventListener('click', (e)=>{
// //         e.preventDefault();

// //         const imageToPost = 
// //             {
// //                 "imageUrl": '@peti.png;type=image/png' ,
// //                 "title":'dd' ,
// //                 "categoryId": '1'
// //               } ;
        


// //         const getPostItemApi = async (imageToPost) => {
// //             try {
// //               const response = await fetch("http://localhost:5678/api/works", {
// //                 method: "POST",
// //                 headers: {
// //                     "Accept": "application/json",
// //                     "Content-Type": "multipart/form-data",
// //                   'Authorization': `Bearer ${tokenString}`,
// //                 },
// //                 body:JSON.stringify(imageToPost),
// //               });
// //             }

// //     catch (error) {
// //         console.log(error);
// //       }
// //     };
// //      getPostItemApi(imageToPost);


// // })};
// //   testPost();

//   /// Données à envoyer dans le corps de la requête (au format JSON ici)
// // var requestBody = {
// //   // Vos données ici...
// // };

// // // En-tête de la requête (avec le token Bearer)
// // var headers = {
// //   'Authorization': 'Bearer votre_token',
// //   'Content-Type': 'application/json'
// // };

// // // Configuration de la requête
// // var requestOptions = {
// //   method: 'POST',
// //   headers: headers,
// //   body: JSON.stringify(requestBody)
// // };

// // Envoi de la requête
// // fetch('votre_url_du_serveur', requestOptions)
// //   .then(response => response.json())
// //   .then(data => {
// //     // Traitement de la réponse du serveur
// //     console.log(data);
// //   })
// //   .catch(error => {
// //     // Gestion des erreurs
// //     console.error('Erreur :', error);
// //   }); 

//           // JSON.stringify(imageToPost);
//         // const imageFetchPara = {
//         //     method: "POST",
//         //     headers: {
//         //       'Authorization': `Bearer ${tokenString}`
//         //     },
//         //     body: imageToPost,
//         //   };


              
//         //   const url = 'http://localhost:5678/api/works';
//         //   fetchThemAll(url, imageFetchPara);

// // function test() {
// //     const imageToPost = {
// //         "id": 0,
// //         "title": "string",
// //         "imageUrl": "string",
// //         "categoryId": "string",
// //         "userId": 0
// //       }
// //       const tokenString = 
// //       {userId:1,token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NjMzNDI0OSwiZXhwIjoxNjg2NDIwNjQ5fQ.jcFBL0wSr_saix8wXl0j3xwV3lB7GIMslA5EOd4ek8c"};            const testPara = {
// //       method: "POST",
// //       headers: {
// //         'Content-Type': 'application/json',    
// //         'Authorization': `Bearer ${tokenString}`
// //       },
// //       body: JSON.stringify(imageToPost),
// //     };
// //     addImageServ('http://localhost:5678/api/works', testPara).then((response)=>{
// //         console.log(response)
// //     })

// // }
// //  test();

// //   async function getTokenFromLocalStorage() {
// //     return new Promise((resolve, reject) => {
// //       const token = localStorage.getItem("Token");
// //       resolve(token);
// //     })
// //   };
// //   async function tokenRecuperation() {
// //     const token = await getTokenFromLocalStorage();
// //     localToken = token;
// //     console.log(localToken, 'string');
// //   }
// //     let Token = await getTokenFromLocalStorage()
// //     console.log(Token, 'hihi');
// //   S0phie
// // async function tokk(test){
// // let tokens = await localToken;
// //     console.log(tokens);
// // }
// // tokk(localToken);
// // });
// // const gallery = document.querySelector(classe);
            
// // const figure = document.createElement("figure");

// // const img = document.createElement("img");
// // img.src = element.imageUrl;

// // const figTxt = document.createElement("figcaption");
// // figTxt.innerText = element.title;

// // // on rattaache tous sa et l'organise
// // figure.appendChild(img);
// // figure.appendChild(figTxt);
// // gallery.appendChild(figure);

