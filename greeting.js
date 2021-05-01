const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector("h4"),
    reset = document.querySelector(".js-button");
const USER_LS = "currentUser",
    NOSHOWING_CN = "noshowing";

function deleteName(){
    localStorage.removeItem(USER_LS);
}

function handleClick(){
    deleteName();
    input.value="";
    this.classList.add(NOSHOWING_CN);
    askForName();
}

function resetName(){
    reset.addEventListener("click", handleClick);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    input.classList.remove(NOSHOWING_CN);
    greeting.classList.add(NOSHOWING_CN);
    reset.classList.add(NOSHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    input.classList.add(NOSHOWING_CN);
    greeting.classList.remove(NOSHOWING_CN);
    reset.classList.remove(NOSHOWING_CN);
    greeting.innerText = `${text}님, 오늘도 화이팅!`;
    resetName();
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();