// Data motivasi lokal
const quotes = [
  "Hidup itu seperti mengendarai sepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak. – Einstein",
  "Kebahagiaan bukanlah sesuatu yang siap dibuat. Itu berasal dari tindakanmu sendiri. – Dalai Lama",
  "Kegagalan adalah keberhasilan yang tertunda. – Thomas Edison",
  "Stay hungry, stay foolish. – Steve Jobs"
];

// Tampilkan quote acak
document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

// DOM element
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const list = document.getElementById("task-list");

// Load dari localStorage saat awal
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Tambah tugas baru
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText !== "") {
    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    updateLocal();
    renderTasks();
    input.value = "";
  }
});

// Fungsi render semua tugas
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">&times;</button>
    `;
    list.appendChild(li);
  });
}

// Tandai selesai
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocal();
  renderTasks();
}

// Hapus tugas
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocal();
  renderTasks();
}

// Simpan ke localStorage
function updateLocal() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
