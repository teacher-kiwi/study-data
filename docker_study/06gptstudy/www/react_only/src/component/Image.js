import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Image() {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');

  const title = "Image";
  const apiUrl = 'https://api.openai.com/v1/images/generations';
  const apiKey = process.env.REACT_APP_GPT_API_KEY;
  //const modelname = 'gpt-3.5-turbo';

  const callGPTApi = async (prompt) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 2,  //생성 그림 갯수
          size: "256x256"
        })
      });

      const data = await response.json();

      //이미지에는 아래 토큰 내용이 없음.
      //const prompt_tokens = data.usage.prompt_tokens;
      //const completion_tokens = data.usage.completion_tokens;
      //const total_tokens = data.usage.total_tokens;

      const urls = data.data.map(item => item.url); // "url" 값들을 배열로 추출
      return urls;
    } catch (error) {
      console.error('GPT API error:', error);
    }
  };

  const handleUserInput = async () => {
    if (userInput.trim() === '') {
      return;
    }

    const newUserMessage = '사용자: ' + userInput;
    setChatLog((prevChatLog) => [...prevChatLog, newUserMessage]);
    setUserInput('');

    addWaitingMessage('GPT 답변 오는 중...(시간이 다소 걸림)');

    const response = await callGPTApi(userInput);
    addChatbotMessage(response);
  };

  const addWaitingMessage = (message) => {
    const newMessage = (
      <div className="waiting" style={{ color: 'red' }}>
        {message}
      </div>
    );
    setChatLog((prevChatLog) => [...prevChatLog, newMessage]);
  };

  const addChatbotMessage = (message) => {
    message.forEach(url => {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        <img src={url} />
      ]);
    });
  };

  const Inputform = ({title}) => {
    return (
      <div>
      </div>
    );
  };

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      handleUserInput(); 
    }
  };


  return (
    <div>
        <div className={styles.타이틀} id="타이틀">
          {title}
        </div>
        <div className={styles.chatcontainer}>
          <div className={styles.채팅기록창}>
            {chatLog.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <div className={styles.userinput} id="userinput">
            <input
              type="text"
              className={styles.입력상자}
              id="사용자입력상자"
              placeholder="글을 입력해 주세요..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
            <button className={styles.전송버튼} onClick={handleUserInput} id="전송버튼">전송</button>
          </div>
        </div>
    </div>  
  );
};

export default Image;

