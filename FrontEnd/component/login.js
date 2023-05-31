import { fetchThemAll } from "./fetch.js";

export let tokens;
export let status;
let url = "http://localhost:5678/api/users/login";

const autentification = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};


const LoginForm = document.querySelector(".login");
LoginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const tryLogin = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
  };
  console.dir(tryLogin);
  const loginJson = JSON.stringify(tryLogin);
  const   loginParameter=  {
    method: "POST",
  headers: {
  "Content-Type": "application/json",
  },
  body: loginJson,
  } ;

  // fetchLogin(loginJson);
  fetchThemAll(url,  loginParameter)
  .then((response) => {
    console.log(response, "ce que sa devrait afficer");      
    status = response.status; 
    console.log(status);
    return response.json();
  })
  .then((response)=> {
    tokens = response
    console.log(tokens);
    AutorisationLogin(status);
    return tokens;
  })
});


// function fetchLogin(loginJson) {
//   return fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: loginJson,
//   })
//     .then((response) => {
//       console.log(response, "ce que sa devrait afficer");      
//       status = response.status; 
//       console.log(status);
//       AutorisationLogin(status);
//       return response;
//     })
//     .then((data) => {
//       console.log(data , "tfgfgdgdgdgdg");
//       // Traitez les données reçues du serveur ici
//       tokens = data;
//       console.log(data);
//       console.log(tokens , " voici le token ");
//       return tokens;
//     })
//     .catch((error) => {
//       // Gérez les erreurs ici
//       console.error(error);
//     });
// };


function AutorisationLogin(status) {
  const error = document.querySelector(".error");
  const email = document.querySelector("[name=email]");
  const pass = document.querySelector("[name=password]");

  const statusActions = {
    200: () => {
      console.log("vous êtes connecté");
      error.style.display = "none";
      email.classList.remove("errrorAnimation");
      pass.classList.remove("errrorAnimation");
      localStorage.setItem("Token" , JSON.stringify(tokens));
      let local =  localStorage.getItem("Token");
      let parsedLocal = JSON.parse(local);
      console.log(local, 'string');
      console.log(parsedLocal, 'parsed');
      // window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
    },
    default: () => {
      error.style.display = "block";
      email.classList.add("errrorAnimation");
      pass.classList.add("errrorAnimation");
      console.log("vous n'êtes pas connecté");
      setTimeout(() => {
        email.classList.remove("errrorAnimation");
        pass.classList.remove("errrorAnimation");
      }, 1000);
    },
  };

  const action = statusActions[status] || statusActions.default;
  action();
}
/*cette fonction prend un para le status
  elle crée un objet avec deux clef qui contiennent
  chacun en valeur une fonction anonyme flecher pour
  exécuter des ordres
  l'objet et ensuite passer en valeur a une constante 
  action qui prendra en valeur non pas l'objet global 
  mais une des deux valeur des clef qui sont des fonction
  action prendra en valeur celle qui existe 
  et pour obtenir la premirer valeur il faut que la clef soit
  200 donc que la valeur de la fonction soit 200 
  ont exécute action() comme un fonction car il
  contient au minimun une fonction
  lors de sont apelle il va verifier a qu'elle valeur 
  il correspond auquelle ont a choisie a l'attribution 
  de lui donner un comparateur de clef pour lui donner
  celle dont on veut que la fonction soit utiliser
  en conclusion c'est un if/else élégant et pas simple 
*/


//----------cimetierer-----------

// function AutorisationLogin(status) {
//   const error = document.querySelector(".error");
//   const email = document.querySelector("[name=email]");
//   const pass = document.querySelector("[name=password]");

//   if (status === 200){
//     console.log("vous êtes connecter");
//     error.style.display = "none";
//       email.classList.remove("errrorAnimation");
//       pass.classList.remove("errrorAnimation");
//       // window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
//   }
//   else{
//     error.style.display = "block";
//     email.classList.add("errrorAnimation"); 
//     pass.classList.add("errrorAnimation"); ;
//     console.log("vous ete pas co");
//      setTimeout(()=> {
//       email.classList.remove("errrorAnimation");
//       pass.classList.remove("errrorAnimation");
//      }, 1000)
//   }

// };