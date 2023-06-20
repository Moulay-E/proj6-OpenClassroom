//this function can take only one parameter
export async function fetchThemAll(url, option = {}) {
    try {
        const response = await fetch(url, {
            method: option.method || "GET",
            headers: option.headers || {},
            body: option.body || null
          
        });
        return response;
    }
    catch (error){
        const errorMessage = !response.ok ? error  : "Erreur de la requete" ;
        console.log( errorMessage);
        return errorMessage;
    }
};
// retrieves the json version of the api return
export async function fetchJson (url){
    const response = await fetchThemAll(url);
    return response.json();

}; 
