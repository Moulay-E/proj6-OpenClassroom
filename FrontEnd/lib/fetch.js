
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

  export async function fetchLogin(url, option = {}) {
    try {
        const response = await fetch(url, {
            method: option.method || "GET",
            headers: option.headers || {},
            body: option.body || null,
        });
        return response;
    }
    catch (error) {
        const errorMessage = !response.ok ? error : "Erreur de la requête";
        console.log(errorMessage);
        return errorMessage;
    }
};
