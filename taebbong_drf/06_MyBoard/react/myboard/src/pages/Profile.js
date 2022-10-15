import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Profile = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navi("/");

    document.querySelector("#username").value = state?.user.user.username;
    document.querySelector("#nickname").value = state?.user.nickname;
    document.querySelector("#position").value = state?.user.position;
    document.querySelector("#subjects").value = state?.user.subjects;
  }, [navi, state]);

  const handleEdit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const formData = new FormData();
    const image = e.target.querySelector("#image").files[0];
    formData.append("nickname", e.target.querySelector("#nickname").value);
    formData.append("position", e.target.querySelector("#position").value);
    formData.append("subjects", e.target.querySelector("#subjects").value);
    if (image) formData.append("image", image);
    axios
      .patch(`/users/profile/${id}/`, formData, { headers: { Authorization: `Token ${token}` } })
      .then(({ status }) => {
        if (status === 200) navi("/");
      })
      .catch((err) => window.alert("변경 실패했습니다."));
  };

  return (
    <div>
      <h3>프로필 변경 페이지입니다.</h3>
      <button onClick={() => navi("/")}>홈으로</button>
      <br />
      <br />
      <form onSubmit={handleEdit}>
        <label htmlFor="username">아이디</label>
        <input type="text" id="username" disabled />
        <br />
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" />
        <br />
        <label htmlFor="position">직종</label>
        <input type="text" id="position" />
        <br />
        <label htmlFor="subjects">관심사</label>
        <input type="text" id="subjects" />
        <br />
        <label htmlFor="image">사진</label>
        <input type="file" id="image" accept="image/png, image/jpeg" />
        <br />
        <br />
        <button>변경</button>
      </form>
    </div>
  );
};

export default Profile;
