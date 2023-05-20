

 export function generationFigure(array){
    document.querySelector(".gallery").innerHTML="";
    for( let i =0; i< array.length; i++) {

        const element = array[i];
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
    }

}


 export function filtrer(variable,value, tableau){
    
    variable.addEventListener("click",function(){

        const tableauFiltrer = tableau.filter(function(item){
            console.log(item.categoryId +"r");
            return value.includes(item.categoryId);
            // item.categoryId  === value;
        })
        // val = tableauFiltrer.title;
        console.log(tableauFiltrer+ "tab");
        generationFigure(tableauFiltrer);
    })
};




export function categorie(array) {
    let result = {};
    for(let i = 0; i< array.length; i++){
          
         switch(array[i].name){
            case "Objets":
                result.obj = array[i].id;
                console.log("obj"+ result.obj)
                break;

                case "Appartements":
                result.appt = array[i].id;
                console.log("appt"+ result.appt)
                break;

                case "Hotels & restaurants":
                result.hostel = array[i].id;
                console.log("hotel"+  result.hostel)
                break;
         }
    }
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
