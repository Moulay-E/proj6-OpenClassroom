export let tokens;
export let status;
const autentification = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};

const LoginForm = document.querySelector(".login");
LoginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const tryLogin = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  };
  console.dir(tryLogin);
  const loginJson = JSON.stringify(tryLogin);
  fetchLogin(loginJson).then(()=>{
    AutorisationLogin(status)
  });
});

function fetchLogin(loginJson) {
  return fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: loginJson,
  })
    .then((response) => {
      status = response.status; 
      console.log(status);

    return response.json();
    })
    .then((data) => {
      console.dir(data);
      // Traitez les données reçues du serveur ici
      tokens = data;
      console.log(data);
      console.log(tokens.token + " voici le token ");
      return tokens;
    })
    .catch((error) => {
      // Gérez les erreurs ici
      console.error(error);
    });
};


function AutorisationLogin(status) {
  const error = document.querySelector(".error");
  const pass = document.querySelector("[name=password]");
  if (status === 200){
    console.log("vous êtes connecter");
    error.style.display = "none";
    pass.style.backgroundColor = "white";
  }
  else{
    console.log("vous ete pas co");
     pass.style.backgroundColor = "red";
     error.style.display = "block";
  }

};
