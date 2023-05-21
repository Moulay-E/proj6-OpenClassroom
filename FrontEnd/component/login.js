export let tokens;
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
  fectchLogin(loginJson).then(() => {
    const pass = document.querySelector("[name=password]");
    pass.style.backgroundColor = "red";
  });
});

function fectchLogin(loginJson) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: loginJson,
  })
    .then((response) => response.json())
    .then((data) => {
      // Traitez les données reçues du serveur ici
      tokens = data;
      console.log(data);
      console.log(tokens.token + " voici le token ");
    })
    .catch((error) => {
      // Gérez les erreurs ici
      console.error(error);
    });
}
