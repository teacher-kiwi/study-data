const clock = document.querySelector("h2#clock");

function padStart0(number) {
  return String(number).padStart(2, "0");
}

function getClock() {
  const date = new Date();
  const hours = padStart0(date.getHours());
  const minutes = padStart0(date.getMinutes());
  const seconds = padStart0(date.getSeconds());

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);
