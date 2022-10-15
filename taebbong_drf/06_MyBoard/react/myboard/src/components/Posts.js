import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const Posts = ({ pk, user, profile, title, category, body, image, likes, comments, published_date, isLogin }) => {
  const [date] = useState(new Date(published_date));
  const [token] = useState(localStorage.getItem("token"));
  const [like, setLike] = useState(likes?.length);
  const [hidden, setHidden] = useState(false);

  const navi = useNavigate();

  const handleLikeBtn = () => {
    axios(`/like/${pk}/`, { headers: { Authorization: `Token ${token}` } }).then(({ data }) => setLike(data.count));
  };

  const handleDelBtn = () => {
    if (window.confirm("정말 삭제하시겠습니까?"))
      axios.delete(`/posts/${pk}`, { headers: { Authorization: `Token ${token}` } }).then(({ status }) => {
        if (status === 204) {
          setHidden(true);
        } else {
          window.alert("권한이 없습니다.");
        }
      });
  };

  const handleEditBtn = () => {
    navi(`/edit/${pk}`, { state: { title, category, body, image } });
  };

  return (
    <div style={{ border: "dashed", padding: "1em", marginBottom: "1em", display: hidden ? "none" : "block" }}>
      <p>글번호: {pk}</p>
      <h4>제목: {title}</h4>
      {category && <p>카테고리: {category}</p>}
      <p>
        작성시간: {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {date.getHours()}시 {date.getMinutes()}분
      </p>
      <p>글쓴이: {profile.nickname ? profile.nickname : profile.user.username}</p>
      <p>내용: {body}</p>
      <p>이미지:</p>
      <img alt="" src={new URL(image).pathname} style={{ width: "10em" }} />
      <br />
      <button onClick={handleLikeBtn}>좋아요 {like}</button>
      {user.user?.username === profile.user.username ? (
        <>
          <button style={{ margin: "0 1em" }} onClick={handleEditBtn}>
            글수정
          </button>
          <button style={{ color: "red" }} onClick={handleDelBtn}>
            글삭제
          </button>
        </>
      ) : null}
      <br />
      <Comments pk={pk} comments={comments} user={user} token={token} isLogin={isLogin}></Comments>
    </div>
  );
};

export default Posts;
