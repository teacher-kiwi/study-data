import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const idInput = useRef();
  const emailInput = useRef();
  const pwInput = useRef();
  const pw2Input = useRef();

  const navi = useNavigate();

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", idInput.current.value);
    formData.append("email", emailInput.current.value);
    formData.append("password", pwInput.current.value);
    formData.append("password2", pw2Input.current.value);

    axios
      .post("/users/register/", formData)
      .then(({ status }) => {
        if (status === 201) {
          window.alert("회원가입 완료!");
          navi("/");
        }
      })
      .catch((err) => {
        window.alert(JSON.stringify(err.response?.data));
      });
  };
  return (
    <div>
      <h3>회원가입 페이지입니다.</h3>
      <form onSubmit={register}>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" ref={idInput}></input>
        <br />
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" ref={emailInput}></input>
        <br />
        <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" ref={pwInput}></input>
        <br />
        <label htmlFor="pw2">비밀번호 확인</label>
        <input type="password" id="pw2" ref={pw2Input}></input>
        <br />
        <button>회원가입</button>
      </form>
      <button onClick={() => navi("/")}>홈으로</button>
    </div>
  );
};

export default Register;
