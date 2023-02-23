const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
const color = document.querySelector("#color-options");
const modeChecker = document.querySelector("#mode-checker");

const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
ctx.lineWidth = 9;

let isPainting = false;
let isFill = false;

const handleMove = (event) => {
  if (event.buttons == 1) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
};

const onChangeLineWidth = () => {
  ctx.lineWidth = lineWidth.value * 3;
};

const changeColor = (color) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const onChangeLineColor = () => {
  changeColor(lineColor.value);
};

const onChangeColor = (event) => {
  if (Array.from(event.target.classList).includes("color-option")) {
    const newColor = event.target.dataset.color;
    lineColor.value = newColor;
    changeColor(newColor);
  }
};

const modeChange = () => {
  if (isFill) {
    isFill = false;
    modeChecker.innerText = "Draw";
  } else {
    isFill = true;
    modeChecker.innerText = "Fill";
  }
};

const handleClick = () => {
  if (isFill) ctx.fillRect(0, 0, 500, 500);
};

canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("click", handleClick);

lineWidth.addEventListener("change", onChangeLineWidth);
lineColor.addEventListener("change", onChangeLineColor);
color.addEventListener("click", onChangeColor);
modeChecker.addEventListener("click", modeChange);
