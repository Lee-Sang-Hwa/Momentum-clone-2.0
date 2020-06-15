const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  formToDo = document.querySelector(".js-toDoForm"),
  toDoInput = formToDo.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}
function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}
// Pending List와 Finished List 공통 사항
function buildGenericList(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = task.text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTask);
  li.append(span, delBtn);
  li.id = task.id;
  return li;
}
// Pending List
function paintPendingTask(task) {
  const genericList = buildGenericList(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericList.append(completeBtn);
  pendingList.append(genericList);
}
// Finished List
function paintFinishedTask(task) {
  const genericList = buildGenericList(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "🔄";
  backBtn.addEventListener("click", handleBackClick);
  genericList.append(backBtn);
  finishedList.append(genericList);
}
//PENDING, FINISHED 값 저장
function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}
//PENDING, FINISHED 값 불러오기, 값 없으면 공백으로 불러오기
function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}
//복원
function restoreState() {
  pendingTasks.forEach(function (task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    paintFinishedTask(task);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const taskObj = getTaskObject(toDoInput.value);
  toDoInput.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}
//load 상태와 restore 상태 불러옴
function init() {
  formToDo.addEventListener("submit", handleSubmit);
  loadState();
  restoreState();
}
init();
