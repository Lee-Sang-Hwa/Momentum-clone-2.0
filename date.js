const dateContainer = document.querySelector(".js-date");
dateTitle = dateContainer.querySelector("div");

function getToday() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  //month = month > 9 ? month : "0" + month;
  //day = day > 9 ? day : "0" + day;
  //dateTitle.innerText = `${year}-${month}-${day}`;
  dateTitle.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
}

function init() {
  getToday();
  setInterval(getToday, 1000);
}

init();
