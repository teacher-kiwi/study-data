import styles from "./styles.module.css"; 
import { useState } from "react";

function Google() {
  const [chatLog, setChatLog] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const title = "google";
  const apiUrl = process.env.REACT_APP_SERVER + title;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setChatLog("");
  };
  
  const addWaitingMessage = (message) => {
    const newMessage = (
      <div className="waiting" style={{ color: 'red' }}>
        {message}
      </div>
    );
    setChatLog(newMessage);
  };

  const handleImageSubmit = () => { 
    addWaitingMessage('OCR 분석중...(시간이 다소 걸림)');
    
    if (!selectedImage) {
      console.log('No image selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', selectedImage);

    fetch(apiUrl, {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        // 서버로부터 받은 응답 처리
        setChatLog(data)
      })
      .catch(error => {
        // 에러 처리
        console.error('Error:', error);
      });
  };

  return (
    <div>
        <div className={styles.타이틀} id="타이틀">
          {title}
        </div>
        <div className={styles.chatcontainer}>
          <div className={styles.채팅기록창}>
              <div><pre>{chatLog}</pre></div>
          </div>
          <div className={styles.userinput} id="userinput">
            <input name="image" type="file" accept="image/*" className={styles.입력상자} onChange={handleImageUpload} />
            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ width: '300px' }} />}
          </div>
          <div className={styles.userinput} id="userinput2">
            <button className={styles.전송버튼} onClick={handleImageSubmit} id="전송버튼">전송</button>
          </div>
        </div>
    </div>  
  );
};

export default Google;

