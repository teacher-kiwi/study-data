const imageCount = 3;

const choosenImage = `img/${Math.ceil(Math.random() * imageCount)}.jpg`;

const bgImage = document.createElement("img");

bgImage.src = choosenImage;

document.body.appendChild(bgImage);
