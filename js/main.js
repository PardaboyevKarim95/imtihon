const elList = document.querySelector(".listt");
const elWrapper = document.querySelector(".wrapper");
const elExpenses = document.querySelector(".expenses-span");
const elIcomse = document.querySelector(".incomes-span");
const elBalans = document.querySelector(".balance-span");

const localToken = localStorage.getItem("tokenlog");
if (!localToken) {
  location.replace("register.html");
}
async function getIncomseFunc() {
  let url = await fetch("http://localhost:9090/get-incomes", {
    method: "GET",
    headers: {
      token: localToken,
    },
  });
  const data = await url.json().then((data) => {
    if (data.length) {
      totalIncomesFunc(data);
    }
  });
}
let arr = [];

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
      totalExpensesFunc(data);
    }
  });
}

getExpensesFunc();

let expence = [];

function totalIncomesFunc(data) {
  let a = 0;
  data.forEach((item) => {
    a += item.amount;
  });
  expence.push(a);
  console.log(a, "iii");
  elIcomse.textContent = a;
  render(data);
}

function totalExpensesFunc(data) {
  let a = 0;
  data.forEach((item) => {
    a += item.amount;
  });
  balans(expence[0], a);

  expence.push(a);

  elExpenses.textContent = a;

  console.log(a, "eee");
  render(data);
}

function balans(a, b) {
  console.log(a);
  console.log(b);
  let c = a - b;
  elBalans.textContent = c;
}

// function postFunc() {
//   fetch("http://localhost:9090/add-income", {
//     method: "POST",
//     headers: { "Content-Type": "application/json", token: `${localToken}` },
//     body: JSON.stringify({
//       title: "Asd",
//       amount: 2000,
//       category: "asad",
//       description: "sadasd",
//       date: "12-12-2023",
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((error) => {
//       console.log(error);
//     });
// }
// postFunc();
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
});
function render(array) {
  console.log(array, "bbbbbbb");
  console.log(array, "aaaaa");
  elList.innerHTML = "";
  let limit = 0;
  array.forEach((data) => {
    elList.innerHTML += `
    <li class="list-unstyled d-flex justify-content-between flex-wrap w-100 p-2 border rounded-2 bg-light mb-2 fs-5">
        <p class="text d-flex flex-column text-center text-danger">title <span class=" span text-primary"> ${data.title}</span></p>

        <p class="text d-flex flex-column text-center text-danger">amount <span class=" span text-primary"> ${data.amount}</span></p>

        <p class="text d-flex flex-column text-center text-danger">category <span class=" span text-primary"> ${data.category}</span></p>

        <p class="text d-flex flex-column text-center text-danger">description <span class=" span text-primary"> ${data.description}</span></p>

        <p class="text d-flex flex-column text-center text-danger">data <span class=" span text-primary"> ${data.data}srgssdfsddhffdghf</span></p>
      </li>`;
    limit++;
    if (limit > 5) {
      console.log(elList.children[0].remove());
    }
  });
}
