const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const modelname = 'text-davinci-003';

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
    const response = await openai.createCompletion({  //수정 주의
      model: modelname,
      prompt: question,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const prompt_tokens = response.data.usage.prompt_tokens;
    const completion_tokens = response.data.usage.completion_tokens;
    const total_tokens = response.data.usage.total_tokens;

    return (
      response.data.choices[0].text +
      '(전송토큰:' +
      prompt_tokens +
      ',응답토큰:' +
      completion_tokens +
      ',전체토큰:' +
      total_tokens +
      ')'
    );
  };

  const gpt_answer = await gptmodel(question);
  return gpt_answer;
};

module.exports = {
    generate: generate
};
