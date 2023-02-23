const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

//
// .fillRect(), .rect(), .fill(), .fillStyle(), .stroke() and .beginPath()

// ctx.rect(50, 50, 100, 100);
// ctx.stroke();

// ctx.beginPath();

// ctx.rect(150, 150, 100, 100);
// ctx.fill();

// ctx.beginPath();

// ctx.rect(250, 250, 100, 100);
// ctx.stroke();

// ctx.beginPath();

// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

//
// .moveTo(), .lineTo()

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// // ctx.lineTo(50, 150);
// // ctx.lineTo(50, 50);
// ctx.fill();

//
// .arc()
// ctx.arc(100, 100, 30, 0, Math.PI * 1.5, true);
// ctx.stroke();

//
// 그리기

ctx.fillRect(0, 0, canvas.width, canvas.height);

roundedRect(ctx, 24, 24, 300, 300, 30);
roundedRect(ctx, 38, 38, 300, 300, 18);
roundedRect(ctx, 106, 106, 98, 66, 20);
roundedRect(ctx, 106, 238, 98, 32, 12);
roundedRect(ctx, 270, 106, 98, 66, 20);
roundedRect(ctx, 270, 238, 50, 98, 20);

// pacman
ctx.beginPath();
ctx.arc(74, 74, 26, Math.PI / 7, -Math.PI / 7, false);
ctx.lineTo(67, 74);
ctx.fillStyle = "yellow";
ctx.fill();

// item
ctx.fillStyle = "white";
for (let i = 0; i < 8; i++) {
  ctx.fillRect(102 + i * 32, 70, 8, 8);
}
for (i = 0; i < 6; i++) {
  ctx.fillRect(230, 102 + i * 32, 8, 8);
}
for (i = 0; i < 8; i++) {
  ctx.fillRect(102 + i * 32, 198, 8, 8);
}

// enemy
ctx.fillStyle = "red";
ctx.beginPath();
ctx.moveTo(166, 232);
ctx.lineTo(166, 204);
ctx.bezierCurveTo(166, 188, 178, 176, 194, 176);
ctx.bezierCurveTo(210, 176, 222, 188, 222, 204);
ctx.lineTo(222, 232);
ctx.lineTo(212.666, 222.666);
ctx.lineTo(101.666 * 2, 116 * 2);
ctx.lineTo(97 * 2, 111.333 * 2);
ctx.lineTo(92.333 * 2, 116 * 2);
ctx.lineTo(87.666 * 2, 111.333 * 2);
ctx.lineTo(83 * 2, 116 * 2);
ctx.fill();

// enemy's eyes
ctx.fillStyle = "white";
ctx.beginPath();
ctx.moveTo(91 * 2, 96 * 2);
ctx.bezierCurveTo(88 * 2, 96 * 2, 87 * 2, 99 * 2, 87 * 2, 101 * 2);
ctx.bezierCurveTo(87 * 2, 103 * 2, 88 * 2, 106 * 2, 91 * 2, 106 * 2);
ctx.bezierCurveTo(94 * 2, 106 * 2, 95 * 2, 103 * 2, 95 * 2, 101 * 2);
ctx.bezierCurveTo(95 * 2, 99 * 2, 94 * 2, 96 * 2, 91 * 2, 96 * 2);
ctx.moveTo(103 * 2, 96 * 2);
ctx.bezierCurveTo(100 * 2, 96 * 2, 99 * 2, 99 * 2, 99 * 2, 101 * 2);
ctx.bezierCurveTo(99 * 2, 103 * 2, 100 * 2, 106 * 2, 103 * 2, 106 * 2);
ctx.bezierCurveTo(106 * 2, 106 * 2, 107 * 2, 103 * 2, 107 * 2, 101 * 2);
ctx.bezierCurveTo(107 * 2, 99 * 2, 106 * 2, 96 * 2, 103 * 2, 96 * 2);
ctx.fill();

ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(101 * 2, 102 * 2, 2 * 2, 0, Math.PI * 2, true);
ctx.fill();

ctx.beginPath();
ctx.arc(89 * 2, 102 * 2, 2 * 2, 0, Math.PI * 2, true);
ctx.fill();

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#0033FF";
  ctx.stroke();
}
