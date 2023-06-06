
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