const loginForm = document.querySelector("#login");
const helloDiv = document.querySelector("#hello");
const logoutBtn = document.querySelector("#logout");

const USER_KEY = "user";

const login = (user) => {
  if (user) {
    helloDiv.children[0].innerText = `${user}, 반갑습니다!`;
    helloDiv.removeAttribute("hidden");
    loginForm.setAttribute("hidden", true);
    localStorage.setItem(USER_KEY, user);
  }
};

const logout = () => {
  localStorage.removeItem(USER_KEY);
  helloDiv.setAttribute("hidden", true);
  loginForm.removeAttribute("hidden");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const user = e.target.querySelector("input").value;
  login(user);
};

loginForm.addEventListener("submit", handleSubmit);
logoutBtn.addEventListener("click", logout);

login(localStorage.getItem(USER_KEY));
