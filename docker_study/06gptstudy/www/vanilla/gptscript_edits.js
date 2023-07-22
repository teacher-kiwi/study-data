// Openai API 토큰
document.write('<script src="./gptapikey.js"></script>');
//const apiKey = 'sk-************';

const title = 'Edits API 예시';
// API의 엔드포인트 URL
const apiUrl = 'https://api.openai.com/v1/edits';
const modelname = 'text-davinci-edit-001';

const 타이틀 = document.getElementById('타이틀');
타이틀.textContent = title;
const 채팅기록창 = document.getElementById('채팅기록창');
const 사용자입력상자 = document.getElementById('사용자입력상자');
const 전송버튼 = document.getElementById('전송버튼');

// GPT API를 호출하는 함수
async function callGPTApi(prompt) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({  //달라지는 부분
      'model': modelname,
      "input": prompt,
      "instruction": "Fix the spelling mistakes",
    })
  });

  const data = await response.json();

  var prompt_tokens=data.usage.prompt_tokens;
  var completion_tokens=data.usage.completion_tokens;
  var total_tokens=data.usage.total_tokens;

  // 달라지는 부분
  return data.choices[0].text + "(전송토큰:" + prompt_tokens + ",응답토큰:" + completion_tokens + ",전체토큰:" + total_tokens + ")";    //달라지는 부분
}

//사용자 입력값을 채팅기록창에 추가
function addUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.textContent = message;
  채팅기록창.appendChild(messageElement);
}

//대기 문장을 채팅기록창에 추가
function addWaitingMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('waiting');
  messageElement.textContent = message;
  messageElement.style.color = "red";
  채팅기록창.appendChild(messageElement);
}

//대기 삭제 및 gpt 응답을 채팅기록창에 추가
function addChatbotMessage(message) {
  const waitingElement = document.querySelector('.waiting');
  waitingElement.remove();
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbot-message');
  messageElement.textContent = message;
  messageElement.style.color = "blue";
  채팅기록창.appendChild(messageElement);
}

//메인 함수
async function handleUserInput() {
  const userInputValue = 사용자입력상자.value;
  if (userInputValue.trim() === '') {
    return;
  }
  
  //사용자 입력값을 채팅기록창에 추가
  addUserMessage("사용자: " + userInputValue);
  사용자입력상자.value = '';

  //대기 문장을 채팅기록창에 추가
  addWaitingMessage('GPT 답변 오는 중...(시간이 다소 걸림)');

  const response = await callGPTApi(userInputValue);
  //대기 삭제 및 gpt 응답을 채팅기록창에 추가
  addChatbotMessage("GPT: " + response);
}

//버튼 또는 엔터키 처리
전송버튼.addEventListener('click', handleUserInput);
사용자입력상자.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});
