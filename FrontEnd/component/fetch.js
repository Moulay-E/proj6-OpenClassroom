//mettre en asynch
//fonction que recupere avec un fetch les donée de l'api ou serv
// deux parametre , option est optionelle est sert
// pour le login dans notre cas 
// avec un objet vide et des opérateur || ou
//elle peut s'executer avec un seul parametre

//cette fonction a besoin d'être stringify en json 
// lord de son appel
export async function fetchThemAll(url, option = {}) {
    try {
        const response = await fetch(url, {
            method: option.method || "GET",
            headers: option.headers || {},
            body: option.body || null,
          
        });
        return response;
    }
    catch (error){
        const errorMessage = !response.ok ? error  : "Erreur de la requete" ;
        console.log( errorMessage);
        return errorMessage;
    }
};

// permet de recuperer la version json du retour api
export async function fetchJson (url){
    const response = await fetchThemAll(url);
    return response.json();

}; 




// function fetchLogin(loginJson) {
//     return fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: loginJson,
//     })
//       .then((response) => {
//         status = response.status; 
//         console.log(status);
  
//         return response.json();
//       })
//       .then((data) => {
//         console.dir(data);
//         // Traitez les données reçues du serveur ici
//         tokens = data;
//         console.log(data);
//         console.log(tokens.token + " voici le token ");
//         return tokens;
//       })
//       .catch((error) => {
//         // Gérez les erreurs ici
//         console.error(error);
//       });
//   };

//     // .then(response => response.json()
//     // .then(data => {
//     //     console.dir(data)
//     //     console.log('ggg')
//     //     return data;
//     // })
//     // .catch(error =>{
//     //     console.log(error);
//     // }));
// //}

