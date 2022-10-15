import { useNavigate } from "react-router-dom";

const Header = ({ isLogin, user, logout }) => {
  const navi = useNavigate();
  return (
    <div style={{ marginBottom: "3em", padding: "1em", border: "solid" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>DRF 스터디 게시판입니다.</h2>
      {isLogin && (
        <div>
          <h4>안녕하세요? {user.nickname ? user.nickname : user.user?.username}님!</h4>
          {user.image && <img alt="" src={new URL(user.image).pathname} style={{ width: "10em" }} />}
          <br />
          <button onClick={logout}>로그아웃</button>
          <button onClick={() => navi(`/profile/${user.user.pk}`, { state: { user } })}>프로필변경</button>
          <button onClick={() => navi("/post")}>글쓰기</button>
        </div>
      )}
      {isLogin || (
        <div>
          <button onClick={() => navi("/login")}>로그인</button>
          <button onClick={() => navi("/register")}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default Header;
