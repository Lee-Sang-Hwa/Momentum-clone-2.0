const greetForm = document.querySelector(".js-form"),
  greetInput = greetForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetForm.classList.add(SHOWING_CN);
  greetForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greetForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Welcome ${text}`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();
