const { createWorker } = require('tesseract.js');

const tesseractocr = async (imagePath) => {
  const worker = await createWorker();

  await worker.loadLanguage('kor+eng');
  await worker.initialize('kor+eng');
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();
  return text;
}

module.exports = {
  tesseractocr: tesseractocr
};
