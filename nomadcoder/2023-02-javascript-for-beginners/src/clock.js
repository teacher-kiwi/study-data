const clockDiv = document.querySelector("#clock");

const paintTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];
  const hour = String(today.getHours()).padStart(2, "0");
  const minute = String(today.getMinutes()).padStart(2, "0");
  const second = String(today.getSeconds()).padStart(2, "0");

  clockDiv.children[0].innerText = `${year}. ${month}. ${date}.(${day})`;
  clockDiv.children[1].innerText = `${hour}:${minute}:${second}`;
};

paintTime();
setInterval(paintTime, 1000);
