const input=document.getElementById("todoInput");
const addBtn=document.getElementById("addBtn");
const todoList=document.getElementById("todoList");
const deleteAll=document.getElementById("deleteAll");

let todos=JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

addBtn.addEventListener("click",addTodo);

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addTodo();
}

});

deleteAll.addEventListener("click",function(){

todos=[];

saveData();

renderTodos();

});

function addTodo(){

const task=input.value.trim();

if(task===""){
alert("Enter a task");
return;
}

todos.push({

text:task,

completed:false

});

saveData();

renderTodos();

input.value="";

}

function renderTodos(){

todoList.innerHTML="";

todos.forEach(function(todo,index){

const li=document.createElement("li");

if(todo.completed){

li.classList.add("completed");

}

const span=document.createElement("span");

span.textContent=todo.text;

li.appendChild(span);

const actions=document.createElement("div");

actions.className="actions";

const completeBtn=document.createElement("button");

completeBtn.textContent="✓";

completeBtn.className="complete";

completeBtn.onclick=function(){

todos[index].completed=!todos[index].completed;

saveData();

renderTodos();

};

const editBtn=document.createElement("button");

editBtn.textContent="Edit";

editBtn.className="edit";

editBtn.onclick=function(){

const newTask=prompt("Edit Task",todo.text);

if(newTask!==null && newTask.trim()!==""){

todos[index].text=newTask.trim();

saveData();

renderTodos();

}

};

const deleteBtn=document.createElement("button");

deleteBtn.textContent="Delete";

deleteBtn.className="delete";

deleteBtn.onclick=function(){

todos.splice(index,1);

saveData();

renderTodos();

};

actions.appendChild(completeBtn);

actions.appendChild(editBtn);

actions.appendChild(deleteBtn);

li.appendChild(actions);

todoList.appendChild(li);

});

}

function saveData(){

localStorage.setItem(

"todos",

JSON.stringify(todos)

);

}