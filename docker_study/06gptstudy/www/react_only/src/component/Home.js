import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Home() {


  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');

  const saveUserId = event => {
    setId(event.target.value);
    // console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    // console.log(event.target.value);
  };
 
  return (
    <div>
    <div className={styles.타이틀} id="타이틀">
      API 연습
    </div>
    <div>
      <p align='center'>GPT 및 기타 API 연습 중입니다.</p>
    </div>
  </div>
  );
}

export default Home;
