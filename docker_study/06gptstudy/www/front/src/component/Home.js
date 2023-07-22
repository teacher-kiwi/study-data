import styles from "./styles.module.css";

function Home() {
 
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
