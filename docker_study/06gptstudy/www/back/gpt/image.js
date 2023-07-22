const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error('OPENAI_API_KEY is not set.');
  process.exit(1);
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generate = async (question) => {
  
  const gptmodel = async (question) => {
    const response = await openai.createImage({  //수정 주의
      prompt: question,
      n: 2,  //생성 그림 갯수
      size: "256x256"
    });

    const urls = response.data.data.map(item => item.url); // "url" 값들을 배열로 추출
    return urls;
  };

  const gpt_answer = await gptmodel(question);
  return gpt_answer;
};

module.exports = {
    generate: generate
};
