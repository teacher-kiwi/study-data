import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navi = useNavigate();
  const gohome = (e) => {
    e.preventDefault();
    navi("/");
  };
  const login = (e) => {
    e.preventDefault();
    const username = e.target.querySelector("#id").value;
    const password = e.target.querySelector("#pw").value;

    axios
      .post("/users/login/", { username, password })
      .then(({ data }) => {
        window.localStorage.setItem("token", data.token);
        navi("/");
      })
      .catch(({ response }) => {
        window.alert(response?.data.error[0]);
      });
  };
  return (
    <div>
      <h3>로그인 페이지입니다.</h3>
      <form onSubmit={login}>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id"></input>
        <br />
        <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw"></input>
        <br />
        <button>로그인</button>
      </form>
      <button onClick={gohome}>홈으로</button>
    </div>
  );
};

export default Login;
