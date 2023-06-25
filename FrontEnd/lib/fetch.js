
export async function fetchJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur de la requête.");
      }
      return response.json();
    } catch (error) {
      console.log("Il y a eu une erreur sur le Fetch: " + error);
      return error;
    }
  }
  
