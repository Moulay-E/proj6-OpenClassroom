       //progra functionel = function pure 1 chose
            //sepraer cete feunction filterr en differente function
            //crer une function qui apelle des function 
            // les function sont des outils
            //function qui prend en para une fonction ce para = false function (para=false)
 //utiliser for each pour non retoru de tableau
    //et map pour un result
        //eviter if et for
        //ternaire jamais plus de un if et un else

 export function generationFigure(array){
    document.querySelector(".gallery").innerHTML="";
   
        array.map(element => {

            const gallery = document.querySelector(".gallery");
            
            const figure = document.createElement("figure");
            
            const img = document.createElement("img");
            img.src = element.imageUrl;
            
            const figTxt = document.createElement("figcaption");
            figTxt.innerText = element.title;
            
            // on rattaache tous sa et l'organise
            figure.appendChild(img);
            figure.appendChild(figTxt);
            gallery.appendChild(figure);
        })     
}

// crée les btn clicable et filtre le tableau pour en crer un nouveau
// a partir de ce tableau appelle la fonction genererfigure pour 
//pour actualiser l'affichage en fonction du filtre souhaiter
 export function filtrer(btn,categorie, array){
    
    btn.addEventListener("click",function(){
        const arrayFiltrer = array.filter(function(item){
            console.log(item.categoryId +"r");
            return categorie.includes(item.categoryId);
            // item.categoryId  === categorie;
        })
        // val = arrayFiltrer.title;
        console.log(arrayFiltrer+ "tab");
        generationFigure(arrayFiltrer);
    })
};




export function categorie(array) {
    let result = {};
    array.map(element => {

    
         switch(element.name){
            case "Objets":
                result.obj = element.id;
                console.log("obj"+ result.obj)
                break;

                case "Appartements":
                result.appt = element.id;
                console.log("appt"+ result.appt)
                break;

                case "Hotels & restaurants":
                result.hostel = element.id;
                console.log("hotel"+  result.hostel)
                break;
         }
    })
    return result;
   
}


// document.querySelector(".gallery").innerHTML="";
// for(let key in tableauFiltrer[0]){
//     let val = key + ':' + tableauFiltrer[0][key];
//     document.querySelector(".gallery").innerHTML += "coucou "+ val + "<br>";
// }
// tableauFiltrer.forEach(function(item) {
//     document.querySelector(".gallery").innerHTML += "coucou " + item + "<br>";
// });

// const boutonFiltrer = document.querySelector(".btn-filtrer");
// boutonFiltrer.addEventListener("click", function(){
//     const piecesFiltrees = pieces.filter(function (piece) {
//         return piece.prix < 35;
//     });
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// });
