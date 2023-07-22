const multer = require('multer'); 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const uploads = multer({dest: './uploads'})

app.listen(5000, function(){
    console.log('listening on 5000')
});

app.get('/', function(req ,res){
    res.send("Hello World!");
})

const chat = require('./gpt/chat');
const completions = require('./gpt/completions');
const edits = require('./gpt/edits');
const image = require('./gpt/image');

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const gpt_answer = await chat.generate(prompt);
    res.json({ gpt_answer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/completions", async (req, res) => {
    const { prompt } = req.body;
    try {
      const gpt_answer = await completions.generate(prompt);
      res.json({ gpt_answer });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});

app.post("/edits", async (req, res) => {
  const { prompt } = req.body;
  try {
    const gpt_answer = await edits.generate(prompt);
    res.json({ gpt_answer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const gpt_answer = await image.generate(prompt);
    res.json({ gpt_answer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


const tesseract = require('./ocr/tesseract');

app.post("/tesseract", uploads.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }
     const imagePath = req.file.path;
     const tesseract_result = await tesseract.tesseractocr(imagePath);
     fs.unlinkSync(imagePath);
     res.send(tesseract_result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const naver = require('./ocr/naver');

app.post("/naver", uploads.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }
     const imagePath = req.file.path;
     const naver_result = await naver.naverocr(imagePath);
     fs.unlinkSync(imagePath);
     res.send(naver_result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const google = require('./ocr/google');

app.post("/google", uploads.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }
     const imagePath = req.file.path;
     const naver_result = await google.googleocr(imagePath);
     fs.unlinkSync(imagePath);
     res.send(naver_result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});