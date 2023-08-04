const TaskId = document.querySelector("#task_id");
const Name = document.querySelector("#name");
const Completed = document.querySelector("#comp");
const message = document.querySelector(".msg");

const EditForm = document.querySelector(".edit-form");

window.addEventListener("DOMContentLoaded", async () => {
  const id = window.location.search.slice(4);
  try {
    const { data } = await axios.get(`/api/v1/tasks/${id}`);

    const mainData = data.task;

    TaskId.textContent = mainData._id;

    Name.value = mainData.name;

    Completed.checked = Boolean(mainData.completed);
  } catch (error) {
    console.log(error.response.data.error);
  }
});

EditForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = Name.value;

  const completed = Completed.checked;

  const id = TaskId.textContent;

  try {
    await axios.patch(`/api/v1/tasks/${id}`, { name: nameValue, completed });

    message.textContent = `successfully edited`;

    message.classList.add("green");

    setTimeout(() => {
      message.textContent = ``;

      message.classList.remove("green");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});
