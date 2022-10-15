import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navi = useNavigate();
  const handlePost = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const formData = new FormData();
    const image = e.target.querySelector("#image").files[0];
    formData.append("title", e.target.querySelector("#title").value);
    formData.append("category", e.target.querySelector("#category").value);
    formData.append("body", e.target.querySelector("#body").value);
    if (image) formData.append("image", image);

    axios
      .post("/posts/", formData, { headers: { Authorization: `Token ${token}` } })
      .then(({ status }) => {
        if (status === 201) navi("/");
      })
      .catch((err) => window.alert("글쓰기 실패했습니다."));
  };
  return (
    <div>
      <h3>글쓰기 페이지입니다.</h3>
      <button onClick={() => navi("/")}>홈으로</button>
      <br />
      <br />
      <form onSubmit={handlePost}>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" />
        <br />
        <label htmlFor="category">카테고리</label>
        <input type="text" id="category" />
        <br />
        <label htmlFor="body">내용</label>
        <textarea id="body" />
        <br />
        <label htmlFor="image">사진</label>
        <input type="file" id="image" accept="image/png, image/jpeg" />
        <br />
        <br />
        <button>작성</button>
      </form>
    </div>
  );
};

export default Post;
