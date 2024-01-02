const elList = document.querySelector(".list");
const elWrapper = document.querySelector(".wrapper");

const localToken = localStorage.getItem("tokenlog");

async function getIncomseFunc() {
  let arr = [];
  let url = await fetch("http://localhost:9090/get-incomes", {
    method: "GET",
    headers: {
      token: localToken,
    },
  });
  const data = await url.json().then((data) => {
    if (data.length) {
      func(data);

      // arr.push(arr.concat(data));
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
});
function render(array) {
  elList.innerHTML = "";

  array.forEach((data) => {
    elList.innerHTML += `
    <li class="list-unstyled d-flex justify-content-between flex-wrap w-100 p-2 border rounded-2 bg-light mb-2 fs-5">
        <p class="text d-flex flex-column text-center text-danger">title <span class=" span text-primary"> ${data.title}</span></p>

        <p class="text d-flex flex-column text-center text-danger">amount <span class=" span text-primary"> ${data.amount}</span></p>

        <p class="text d-flex flex-column text-center text-danger">category <span class=" span text-primary"> ${data.category}</span></p>

        <p class="text d-flex flex-column text-center text-danger">description <span class=" span text-primary"> ${data.description}</span></p>

        <p class="text d-flex flex-column text-center text-danger">data <span class=" span text-primary"> ${data.date}</span></p>
      </li>`;
  });
}
