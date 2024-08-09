const form = document.querySelector(".tasks_form");

const TASKS = JSON.parse(sessionStorage.getItem("tasks")) || [];

function saveTask(task) {
  try {
    TASKS.push(task);
    sessionStorage.setItem("tasks", JSON.stringify(TASKS));
    renderTasks();
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}

function createTask({ title, description }) {
  const task = {
    id: TASKS.length + 1,
    title,
    description,
    status: "PENDING",
    dueDate: new Date(),
    endDate: new Date(),
  };
  saveTask(task);
  return { code: 200, message: "Task criada com sucesso!" };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target["task_title"].value;
  const description = e.target["task_description"].value;

  if (!title || !description) {
    throw new Error("Título e descrição são obrigatórios");
  }

  createTask({ title, description });
  dialog("tasks");
});
