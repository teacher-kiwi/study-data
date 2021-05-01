const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector("ul");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const delBtn = event.target;
    const li = delBtn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBTN = document.createElement("span");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBTN.innerText = "❌";
    delBTN.addEventListener("click", deleteToDo);
    span.innerText = text;
    span.classList.add("h2");
    li.appendChild(span);
    li.appendChild(delBTN);
    li.id = newId
    li.style.display = "flex";
    li.style.justifyContent = "center";
    li.style.alignItems = "center";
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSetToDo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const pardedToDos = JSON.parse(loadedToDos);
        pardedToDos.forEach(function(todo){paintToDo(todo.text);})
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSetToDo)
}

init();