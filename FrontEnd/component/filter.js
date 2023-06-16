
//  export function generationFigure(array, classe = ".gallery"){
//     document.querySelector(classe).innerHTML="";
   
//         array.map(element => {

//             const gallery = document.querySelector(classe);
            
//             const figure = document.createElement("figure");
            
//             const img = document.createElement("img");
//             img.src = element.imageUrl;
            
//             const figTxt = document.createElement("figcaption");
//             figTxt.innerText = element.title;
            
//             // on rattaache tous sa et l'organise
//             figure.appendChild(img);
//             figure.appendChild(figTxt);
//             gallery.appendChild(figure);
//         })     
// }

// // creates clickable btn and filters the array to create a new one
// // from this array, call the genererfigure function to 
// // to update the display according to the desired filter
//  export function filtrer(btn,categorie, array){
    
//     btn.addEventListener("click",function(){
//         const arrayFiltrer = array.filter(function(item){
//             console.log(item.categoryId +"r");
//             return categorie.includes(item.categoryId);
//         })
//         console.log(arrayFiltrer+ "tab");
//         generationFigure(arrayFiltrer);
//     })
// };
// //use map to compare the different elements of the object to check
// // whether they exist in the array and assign them to the new object
// export function categorie(array) {
//     const mappings = {
//       Objets: "obj",
//       Appartements: "appt",
//       "Hotels & restaurants": "hostel"
//     };
  
//     const result = {};
//     array.map(element => {
//       const propertyName = mappings[element.name];
//       propertyName && (result[propertyName] = element.id);
//       console.log(propertyName + result[propertyName]);
//     });
  
//     return result;
//   }
  

//   //a suppr
// /*on crée un objet avec les clef et valeur, les cled
// corresponde a ce que l'on va recherecher sur l'objet
// que l'on va mapper
// on utilise map et crée une constante qui sera égale
// a la map que l'on a crée avec le chemin recuperer
// grace à map sur l'objet que l'ont a recupreer
// si le chemin correspond c'est a dire que la clef
// de l'objet recuperer correspond a celui que l'ont
// a de notre coter alors la valeur et attribuer a la 
// constante
// ensuite ont utilise un opérateur de comparaisoont
// pour vérifier si  la constante contient une valeur 
// ou est égale a true et ensuite ont utilise
// la comparaison pour effectuer un affectement de valeur
// ont affect a notre objet vide result
// une valeur qui sera la constante récuperer plus haut
// et ont lui attribue une valeur qui grace a map sera celle
// de l'objet quont a attribuer a la constante plus haut
// ont peut faire sa car l'objet que l'on sougaite recuper
// est un objet qui contient deux clef valeur,
// cette manierer de faire evite les if/else et les 
// switch 
// elle est élégante mais pas facile a comprendre
// et demande des notions avancé
// */


