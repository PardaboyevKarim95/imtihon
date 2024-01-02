const elLastName = document.querySelector("#inp-lastname");
const elFirstName = document.querySelector("#inp-firstname");
const elAge = document.querySelector("#inp-age");
const elEmail = document.querySelector("#inp-email");
const eldelet = document.querySelector(".btn-delet");
const eldata = document.querySelector("#inp-password");
const elForm = document.querySelector("form");

function postFunc() {
  fetch("http://localhost:9090/add-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: `${localToken}` },
    body: JSON.stringify({
      title: elLastName.value,
      amount: elAge.value,
      category: elFirstName.value,
      description: elEmail.value,
      date: eldata.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}

const elList = document.querySelector(".list");
const elWrapper = document.querySelector(".wrapper");

const localToken = localStorage.getItem("tokenlog");

let arrdelet = [];
async function getIncomseFunc() {
  let url = await fetch("http://localhost:9090/add-expense", {
    method: "GET",
    headers: {
      token: localToken,
    },
  });
  const data = await url.json().then((data) => {
    if (data.length) {
      func(data);
    }
  });
}
getIncomseFunc();
async function getExpensesFunc() {
  let url = await fetch("http://localhost:9090/get-expenses", {
    method: "GET",
    headers: {
      token: localToken,
    },
  });

  const data = await url.json().then((data) => {
    if (data.length) {
      func(data);
    }
  });
  console.log(data, "kkkkk");
}
getExpensesFunc();

function func(arr) {
  let array = [];
  array = array.concat(arr);
  render(array);
  arrdelet.push(array);
}
elWrapper.addEventListener("click", (e) => {
  if (e.target.matches(".btn-main")) {
    location.replace("index.html");
  }
  if (e.target.matches(".btn-history")) {
    location.replace("history.html");
  }
  if (e.target.matches(".btn-incomes")) {
    location.replace("incomins.html");
  }
  if (e.target.matches(".btn-expenses")) {
    location.replace("expenses.html");
  }
  if (e.target.matches(".btn-log")) {
    localStorage.removeItem("token");
    location.replace("register.html");
  }
  // if (e.target.matches(".btn-delet")) {
  //   let id = e.target.previousElementSibling.textContent;
  //   console.log(id, "ididididid");
  //   fetch(`http://localhost:9090/delete-income/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       token: localToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.length) {
  //         console.log(data);
  //       }
  //     });
  //   let arr = arrdelet.flat();
  //   render(arr);
  //   console.log(arr);
  // }
});
function render(array) {
  elList.innerHTML = "";

  array.forEach((data) => {
    elList.innerHTML += `
    <li class="list-unstyled   w-100 p-2 border rounded-2 bg-light mb-2  fs-5">
        <p class="text d-flex flex-column text-center text-danger">title <span class=" span text-primary"> ${data.title}</span></p>

        <p class="text d-flex  flex-column text-center text-danger">amount <span class=" span text-primary"> ${data.amount}</span></p>

        <p class="text d-flex  flex-column text-center text-danger">category <span class=" span text-primary"> ${data.category}</span></p>

        <p class="text d-flex  flex-column text-center text-danger">description <span class=" span text-primary"> ${data.description}</span></p>

        <p class="text d-flex flex-column text-center text-danger">data <span class=" span text-primary"> ${data.date}</span></p>
        <span class="visually-hidden-focusable">${data.id}</span>
        <button type="submit" class="btn-delet btn btn-primary">deleted</button>

      </li>`;
  });
}
