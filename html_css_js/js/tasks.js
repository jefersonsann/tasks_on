const form = document.querySelector(".tasks_form");

const TASKS = JSON.parse(sessionStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.querySelector("[data-tasks='list']");
  taskList.innerHTML = "";

  TASKS.forEach(({ id, title, description, color, status }) => {
    const hls = status === "completed" ? 0 : color;
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.classList.add("task");
    span.classList.add("task_bg_color");
    span.style.backgroundImage = `linear-gradient(0deg, hsl(${hls}deg 100% 70%), hsl(${hls}deg 100% 60%))`;
    div.setAttribute("data-id", id);
    div.innerHTML = `
    <div class="task_container">
      <div class="task_header">
      <div class="task_status">
        <span>Pendente</span>
      </div>
      <div class="task_header-timesDorp">
        <span class="task_times">1h 30m</span>
        <span class="dropbtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--background)"
          >
            <path
              d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
            />
          </svg>
        </span>
      </div>
      </div>
      <div class="task_content">
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
    </div>
    `;
    div.appendChild(span);
    taskList.appendChild(div);
  });
}

renderTasks();

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
    color: getRandomColor(),
    dueDate: new Date(),
    endDate: new Date(),
  };
  saveTask(task);
  return { code: 200, message: "Task criada com sucesso!" };
}

function getRandomColor() {
  const n = Math.floor(Math.random() * 360);
  return n;
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
