const elEmail = document.querySelector("#email");
const elPassword = document.querySelector("#password");
const elForm = document.querySelector("form");

const gettoken = localStorage.getItem("token");
const data =
  localStorage.getItem("data") == "go"
    ? localStorage.getItem("data")
    : JSON.parse(localStorage.getItem("data"));
console.log(gettoken);
if (!gettoken) {
  location.replace("register.html");
}
if (data == "go") {
  location.replace("index.html");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(elEmail.value);
  console.log(elPassword.value);

  if (data.email != elEmail.value) {
    alert(" Hato: boshqatdan urinib ko'ring");
  } else {
    localStorage.setItem("data", `go`);
    getFunc();
  }
});
function getFunc() {
  fetch("http://localhost:9090/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: elEmail.value,
      password: elPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.token);
      localStorage.setItem("tokenlog", `${data.token}`);

      console.log("gooooo");
    })
    .catch((error) => {
      console.log(error);
    });
  location.replace("index.html");
}
