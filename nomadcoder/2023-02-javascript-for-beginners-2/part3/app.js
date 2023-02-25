const [canvas, memeCanvas] = document.querySelectorAll("canvas");
const lineWidthInput = document.querySelector("#line-width");
const fontSizeInput = document.querySelector("#font-size");
const color = document.querySelector("#color");
const colorOptions = document.querySelector("#color-options");
const field = document.querySelector("#field");
const resetBtn = document.querySelector("#reset-btn");
const memeBtn = document.querySelector("#meme-btn");
const textInput = document.querySelector("#text-input");
const fileInput = document.querySelector("#file-input");
const tools = Object.fromEntries(["draw", "text"].map((tool, i) => [tool, document.querySelector("#tools").children[i]]));

let mode = "draw";
let lineWidth = lineWidthInput.value;
let fontSize = parseInt(fontSizeInput.value);
let lineColor = "#000000";
let canvasWidth, canvasHeight;

const ctx = canvas.getContext("2d");
const ctx2 = memeCanvas.getContext("2d");

const canvasInit = () => {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  changeColor(lineColor);
};

const resizeCanvas = (w, h) => {
  [canvasWidth, canvasHeight] = [w, h];
  [canvas.width, canvas.height] = [canvasWidth, canvasHeight];
  [memeCanvas.width, memeCanvas.height] = [canvasWidth, canvasHeight];
};

const inputImg = (imgUrl) => {
  ctx.beginPath();
  const image = new Image();
  image.src = imgUrl;

  image.onload = () => {
    resizeCanvas(image.naturalWidth, image.naturalHeight);
    ctx2.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(memeCanvas, 0, 0, canvasWidth, canvasHeight);
    canvasInit();
  };
};

const changeColor = (color) => {
  ctx.beginPath();
  lineColor = color;
  ctx.fillStyle = lineColor;
  ctx.strokeStyle = lineColor;
};

const toggleHidden = (mode) => {
  Object.keys(tools).forEach((tool) => {
    if (mode === tool) tools[tool].removeAttribute("hidden");
    else tools[tool].setAttribute("hidden", "");
  });
};

//
canvas.onclick = (event) => {
  switch (mode) {
    case "draw":
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      break;
    case "text":
      const text = textInput.value;
      if (text !== "") {
        ctx.save();
        ctx.lineWidth = 3;
        ctx.font = `${fontSize * 4 + 50}px Dongle`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.lineWidth = Math.ceil(fontSize / 3);
        ctx.strokeText(text, event.offsetX, event.offsetY);
        ctx.restore();
      }
      break;
  }
};
canvas.onmousemove = (event) => {
  if (mode === "draw" && event.buttons === 1) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

lineWidthInput.onchange = () => {
  ctx.beginPath();
  lineWidth = lineWidthInput.value;
  ctx.lineWidth = lineWidth;
};

fontSizeInput.onchange = (event) => {
  fontSize = parseInt(event.target.value);
};

color.onchange = (event) => {
  changeColor(event.target.value);
};
colorOptions.onclick = (event) => {
  if (Array.from(event.target.classList).includes("color-option")) {
    const selectedColor = event.target.dataset.color;
    color.value = selectedColor;
    changeColor(selectedColor);
  }
};

field.onchange = (event) => {
  mode = event.target.value;
  toggleHidden(mode);
};

resetBtn.onclick = () => {
  ctx.reset();
  canvasInit();
  ctx.drawImage(memeCanvas, 0, 0, canvasWidth, canvasHeight);
};

memeBtn.onclick = () => {
  const url = `https://apimeme.com/meme?meme=${memeList[Math.floor(Math.random() * memeList.length)]}&top=&bottom=`;
  inputImg(url);
};

fileInput.onchange = (event) => {
  const url = URL.createObjectURL(event.target.files[0]);
  inputImg(url);
};

resizeCanvas(500, 500);
canvasInit();
