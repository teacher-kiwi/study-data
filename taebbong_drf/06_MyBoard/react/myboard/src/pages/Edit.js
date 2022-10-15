import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Edit = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const titleInput = useRef();
  const categoryInput = useRef();
  const bodyInput = useRef();
  const imageInput = useRef();

  useEffect(() => {
    titleInput.current.value = state.title;
    categoryInput.current.value = state.category;
    bodyInput.current.value = state.body;
  }, [state]);

  const handleEdit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const formData = new FormData();
    const image = e.target.querySelector("#image").files[0];
    formData.append("title", e.target.querySelector("#title").value);
    formData.append("category", e.target.querySelector("#category").value);
    formData.append("body", e.target.querySelector("#body").value);
    if (image) formData.append("image", image);

    axios
      .patch(`/posts/${id}/`, formData, { headers: { Authorization: `Token ${token}` } })
      .then(({ status }) => {
        if (status === 200) navi("/");
      })
      .catch((err) => window.alert("수정 실패했습니다."));
  };
  return (
    <div>
      <h3>글수정 페이지입니다.</h3>
      <button onClick={() => navi("/")}>홈으로</button>
      <br />
      <br />
      <form onSubmit={handleEdit}>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" ref={titleInput} />
        <br />
        <label htmlFor="category">카테고리</label>
        <input type="text" id="category" ref={categoryInput} />
        <br />
        <label htmlFor="body">내용</label>
        <textarea id="body" ref={bodyInput} />
        <br />
        <label htmlFor="image">사진</label>
        <input type="file" id="image" accept="image/png, image/jpeg" ref={imageInput} />
        <br />
        <br />
        <button>작성</button>
      </form>
    </div>
  );
};

export default Edit;
