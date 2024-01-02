const elLastName = document.querySelector("#inp-lastname");
const elFirstName = document.querySelector("#inp-firstname");
const elAge = document.querySelector("#inp-age");
const elEmail = document.querySelector("#inp-email");
const elPassword = document.querySelector("#inp-password");
const elForm = document.querySelector("form");

const gettoken = localStorage.getItem("token");
console.log(gettoken);
if (gettoken) {
  location.replace("login.html");
  console.log("ffffff");
}
function getFunc() {
  fetch("http://localhost:9090/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      last_name: elLastName.value,
      frist_name: elFirstName.value,
      email: elEmail.value,
      password: elPassword.value,
      age: elAge.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        location.replace("login.html");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let obj = {
    email: elEmail.value,
    password: elPassword.value,
  };
  localStorage.setItem("data", JSON.stringify(obj));
  getFunc();
});
