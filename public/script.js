const mainForm = document.querySelector(".main-form");
const tasks = document.querySelector(".tasks");
const inputMain = document.querySelector(".main-input");
const message = document.querySelector(".msg");

window.addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get("/api/v1/tasks");
  const array = data.tasks;
  tasks.innerHTML = array
    .map((task) => {
      return task.completed === true
        ? ` <article>
                <p class="title" style="text-decoration: line-through;">${task.name}</p>
                <div class="icons">
                  <a href="./edit.html?id=${task._id}"><i class="fa-solid fa-pen-to-square"></i></a>
                  <div class="deleteBtn" onclick="handleDelete(event)" data-id="${task._id}">
                    <i class="fa-solid fa-trash-can" ></i>
                  </div>
                </div>
              </article>`
        : ` <article>
                <p class="title">${task.name}</p>
                <div class="icons">
                  <a href="./edit.html?id=${task._id}"><i class="fa-solid fa-pen-to-square"></i></a>
                  <div class="deleteBtn" onclick="handleDelete(event)" data-id="${task._id}">
                    <i class="fa-solid fa-trash-can" ></i>
                  </div>
              </div>
              </article>`;
    })
    .join("");
});

mainForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameValue = inputMain.value;
  try {
    const { data } = await axios.post("/api/v1/tasks", { name: nameValue });
    inputMain.value = "";

    message.textContent = `successfully added`;
    message.classList.add("green");

    setTimeout(() => {
      message.textContent = ``;
      message.classList.remove("green");
    }, 1000);

    const mainData = data.task;
    const article = document.createElement("article");
    article.innerHTML = ` <p class="title">${mainData.name}</p>
            <div class="icons">
              <a href="./edit.html?id=${mainData._id}"><i class="fa-solid fa-pen-to-square"></i></a>
  
              <div class="deleteBtn" onclick="handleDelete(event)" data-id="${mainData._id}">

                <i class="fa-solid fa-trash-can" ></i>
              </div>
            </div>`;

    tasks.appendChild(article);
  } catch (error) {
    console.log(error.response.data.msg.message);
  }
});

const handleDelete = async (event) => {
  const id = event.currentTarget.dataset.id;
  const article = event.currentTarget.parentElement.parentElement;
  article.style.display = "none";
  await axios.delete(`/api/v1/tasks/${id}`);
};
