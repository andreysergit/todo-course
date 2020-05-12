"use strict";

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const btnRemove = document.querySelector(".btn-remove");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
todoList.addEventListener("click", editItem);
btnRemove.addEventListener("click", localStorageClear);

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

let inputSave;
document.addEventListener("DOMContentLoaded", () => {
  inputSave = document.querySelector(".todo-item");
  inputSave.value= JSON.parse(localStorage.getItem("inputSave"));
  console.log(inputSave);
  let clickEdit = document.querySelector(".edit-btn");
  clickEdit.addEventListener("click", () => {
    console.log("hello");
    JSON.stringify(localStorage.setItem("inputSave", inputSave));
  });
});

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    if (confirm("Are you sure?")) {
      todo.classList.add("fall");
    }
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function editItem(event) {
  const item = event.target;
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    todo.contentEditable = todo.contentEditable === `true` ? `false` : `true`;
    if (item.textContent === "") {
      item.previousElementSibling.focus();
      item.textContent = `Ok`;
      item.style.background = "rgb(231, 192, 19)";
    } else {
      item.innerHTML = '<i class="fas fa-pencil-alt"></i>';
      item.style.background = "rgb(208, 243, 8)";
    }
  }
}

function filterTodo(e) {
  const todos = [...todoList.children];
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "remote":
        if (todo.classList.contains("fall")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (
          !todo.classList.contains("completed") &&
          !todo.classList.contains("fall")
        ) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function localStorageClear() {
  localStorage.clear();
}
