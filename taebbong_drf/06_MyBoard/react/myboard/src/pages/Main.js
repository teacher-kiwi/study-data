import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";

const Main = () => {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [next, setNext] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) setLogin(false);
    else {
      axios
        .post("/users/check/", {}, { headers: { Authorization: `Token ${token}` } })
        .then(({ data }) => {
          setLogin(true);
          axios(`/users/profile/${data.id}/`).then(({ data }) => {
            setUser(data);
          });
        })
        .catch((err) => setLogin(false));
    }
    axios("/posts").then(({ data }) => {
      if (data.next) {
        const url = new URL(data.next);
        setNext(url.pathname + url.search);
      } else {
        setNext(null);
      }
      setPosts(data.results);
    });
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setLogin(false);
    setUser({});
  };

  const readNext = () => {
    axios(next).then(({ data }) => {
      if (data.next) {
        const url = new URL(data.next);
        setNext(url.pathname + url.search);
      } else {
        setNext(null);
      }
      setPosts((prev) => [...prev, ...data.results]);
    });
  };

  return (
    <div style={{ padding: "1em" }}>
      <Header isLogin={isLogin} user={user} logout={logout} />
      {posts &&
        posts.map(({ pk, title, category, body, image, comments, likes, profile, published_date }) => (
          <Posts
            key={pk}
            pk={pk}
            user={user}
            title={title}
            category={category}
            body={body}
            image={image}
            comments={comments}
            likes={likes}
            profile={profile}
            published_date={published_date}
            isLogin={isLogin}
          />
        ))}
      {next && (
        <button style={{ margin: "1em" }} onClick={readNext}>
          내용 더 불러오기
        </button>
      )}
    </div>
  );
};

export default Main;
