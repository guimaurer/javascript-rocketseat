var listElement = document.querySelector("body #ulref");
var imputElement = document.querySelector("body #imputlist");
var buttontElement = document.querySelector("body #addlist");


var todos = JSON.parse(localStorage.getItem('list_terefas')) || [];


function renderTodo() {
  listElement.innerHTML = "";

  for (todo of todos) {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    var todoElement = document.createElement("li");
    var textElement = document.createTextNode(todo);
    var pos = todos.indexOf(todo);

    var linkelement = document.createElement("a");
    linkelement.setAttribute("href", "#");
    linkelement.setAttribute("onclick", "excluirTodo(" + pos + ")");
    var text1element = document.createTextNode("Excluir");

    linkelement.appendChild(text1element);

    todoElement.appendChild(textElement);
    
    td1.appendChild(todoElement);
    td3.appendChild(linkelement);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    listElement.appendChild(tr1);
  }
}



function addTodo() {
  var textTodo = imputElement.value;
  if (textTodo != "") {
    todos.push(textTodo);
  } else alert("Conteúdo Vazio");

  renderTodo();
  saveToStorage()
  imputElement.value = "";
}
buttontElement.onclick = addTodo;

function excluirTodo(pos) {
  todos.splice(pos, 1);
  renderTodo();
  saveToStorage()
}

function saveToStorage() {
  localStorage.setItem("list_terefas", JSON.stringify(todos));
}

renderTodo();
