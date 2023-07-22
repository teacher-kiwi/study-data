const axios = require('axios'); 
const fs = require('fs');
const vision = require('@google-cloud/vision');

const googleocr = async (imagePath) => {
  try {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./googlevision.json"
    });
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    const ocrtext = detections[0]?.description;

    return ocrtext;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to perform OCR');
  }
}

module.exports = {googleocr};
