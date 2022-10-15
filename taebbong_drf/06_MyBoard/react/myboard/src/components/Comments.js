import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Comment = ({ user, pk, comment, token }) => {
  const [text, setText] = useState(comment.text);
  const [hide, setHide] = useState(true);
  const [isDel, setDel] = useState(false);
  const inputText = useRef();

  useEffect(() => {
    inputText.current.value = text;
  }, [text]);

  const handleEditBtn = () => {
    if (hide) {
      setHide((prev) => !prev);
    } else {
      setHide((prev) => !prev);
      axios
        .patch(`comments/${comment.pk}/`, { post: pk, text: inputText.current.value }, { headers: { Authorization: `Token ${token}` } })
        .then(({ status }) => {
          if (status === 200) {
            setText(inputText.current.value);
          }
        })
        .catch(() => {
          window.alert("수정 실패");
        });
    }
  };

  const handleDelBtn = () => {
    axios
      .delete(`comments/${comment.pk}/`, { headers: { Authorization: `Token ${token}` } })
      .then(({ status }) => {
        if (status === 204) setDel(true);
      })
      .catch(() => {
        window.alert("삭제 실패");
      });
  };

  return (
    <div hidden={isDel} style={{ marginBottom: "0.25em" }}>
      <span style={{ marginRight: "0.5em" }}>{comment.profile.nickname ? comment.profile.nickname : comment.profile.user.username}:</span>
      <span hidden={!hide}>{text}</span>
      <input type="text" hidden={hide} ref={inputText} />
      <span style={{ marginLeft: "1em" }}>{comment.published_date}</span>

      {user.user?.username === comment.profile.user.username ? (
        <>
          <button style={{ marginLeft: "1em", marginRight: "0.5em" }} onClick={handleEditBtn}>
            수정
          </button>
          <button onClick={handleDelBtn}>삭제</button>
        </>
      ) : null}
    </div>
  );
};

const Comments = ({ pk, comments, user, token, isLogin }) => {
  const [commentState, setComments] = useState(comments);

  const inputText = useRef();

  const postComment = (e) => {
    e.preventDefault();
    axios
      .post("/comments/", { post: pk, text: inputText.current.value }, { headers: { Authorization: `Token ${token}` } })
      .then(({ data, status }) => {
        if (status === 201) {
          inputText.current.value = "";
          setComments((prev) => [...prev, data]);
        }
      })
      .catch(() => window.alert("댓글 작성 실패!"));
  };

  return (
    <div>
      <hr />
      {comments.length === 0 && <p>댓글이 없습니다.</p>}
      {commentState.map((comment) => (
        <Comment key={comment.pk} user={user} pk={pk} comment={comment} token={token} />
      ))}
      {isLogin && (
        <form onSubmit={postComment}>
          <input type="text" ref={inputText}></input>
          <button>작성</button>
        </form>
      )}
    </div>
  );
};

export default Comments;
