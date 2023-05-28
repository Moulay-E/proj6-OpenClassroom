//mettre en asynch
export async function fetchThemAll(url) /*, parameter ={}*/{
  
    try {
        const response = await fetch(url/*,parameter*/)
        const data = await response.json();
        return data;
    }
    catch (error){
        const errorMessage = !response.ok ? error  : "Erreur de la requete" ;
        console.log( errorMessage);
        return errorMessage;
    }
}
    // .then(response => response.json()
    // .then(data => {
    //     console.dir(data)
    //     console.log('ggg')
    //     return data;
    // })
    // .catch(error =>{
    //     console.log(error);
    // }));
//}

