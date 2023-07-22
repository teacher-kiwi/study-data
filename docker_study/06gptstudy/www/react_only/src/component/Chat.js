import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');

  const title = "Chat";
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.REACT_APP_GPT_API_KEY;
  const modelname = 'gpt-3.5-turbo';

  const callGPTApi = async (prompt) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelname,
          temperature: 0.7,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();

      const prompt_tokens = data.usage.prompt_tokens;
      const completion_tokens = data.usage.completion_tokens;
      const total_tokens = data.usage.total_tokens;

      return (
        data.choices[0].message.content +
        '(전송토큰:' +
        prompt_tokens +
        ',응답토큰:' +
        completion_tokens +
        ',전체토큰:' +
        total_tokens +
        ')'
      );
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
    addChatbotMessage('GPT: ' + response);
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
    setChatLog((prevChatLog) => [
      ...prevChatLog.slice(0, prevChatLog.length - 1),
      <div className="chatbot-message" style={{ color: 'blue' }}>
        {message}
      </div>
    ]);
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
          <div className={styles.userinput}>
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

export default Chat;

