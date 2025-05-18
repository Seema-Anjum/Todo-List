
 let todoItemsContainer = document.getElementById("todoItemsContainer");
    let addTodoButton = document.getElementById("addTodoButton");

    function getTodoListFromLocalStorage() {
      let stringifiedTodoList = localStorage.getItem("todoList");
      let parsedTodoList = JSON.parse(stringifiedTodoList);
      return parsedTodoList === null ? [] : parsedTodoList;
    }

    let todoList = getTodoListFromLocalStorage();
    let todosCount = todoList.length;

    function onAddTodo() {
      let userInputElement = document.getElementById("todoUserInput");
      let priorityElement = document.getElementById("priority");
      let deadlineElement = document.getElementById("deadline");

      let userInputValue = userInputElement.value;
      let priorityValue = priorityElement.value;
      let deadlineValue = deadlineElement.value;

      if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
      }

      todosCount++;

      let newTodo = {
        text: userInputValue,
        priority: priorityValue,
        deadline: deadlineValue,
        isChecked: false,
        uniqueNo: todosCount
      };

      todoList.push(newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      createAndAppendTodo(newTodo);
      userInputElement.value = "";
      deadlineElement.value = "";
      priorityElement.value = "medium";
    }

    addTodoButton.onclick = onAddTodo;

    function onTodoStatusChange(checkboxId, labelId, todoId) {
      let labelElement = document.getElementById(labelId);
      labelElement.classList.toggle("checked");

      let todoIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
      todoList[todoIndex].isChecked = !todoList[todoIndex].isChecked;
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    function onDeleteTodo(todoId) {
      let todoElement = document.getElementById(todoId);
      todoItemsContainer.removeChild(todoElement);

      let deleteIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
      todoList.splice(deleteIndex, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }

  function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoCard = document.createElement("div");
  todoCard.className = "todo-card mb-3 p-3 border rounded shadow-sm";
  todoCard.id = todoId;
  todoCard.style.backgroundColor = "#fff";
  todoItemsContainer.appendChild(todoCard);

  let topRow = document.createElement("div");
  topRow.className = "d-flex justify-content-between align-items-center";
  todoCard.appendChild(topRow);

  let leftPart = document.createElement("div");
  leftPart.className = "d-flex align-items-center";
  topRow.appendChild(leftPart);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.checked = todo.isChecked;
  checkbox.classList.add("form-check-input", "me-2");
  checkbox.onclick = () => onTodoStatusChange(checkboxId, labelId, todoId);
  leftPart.appendChild(checkbox);

  let title = document.createElement("label");
  title.htmlFor = checkboxId;
  title.id = labelId;
  title.className = "fw-bold";
  if (todo.isChecked) title.classList.add("text-decoration-line-through", "text-muted");
  title.textContent = todo.text;
  leftPart.appendChild(title);

  let rightPart = document.createElement("div");

  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-primary me-2";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTodo(todoId);
  rightPart.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => onDeleteTodo(todoId);
  rightPart.appendChild(deleteBtn);

  topRow.appendChild(rightPart);

  let metaRow = document.createElement("div");
  metaRow.className = "mt-2 d-flex justify-content-between align-items-center";
  todoCard.appendChild(metaRow);

  let priorityBadge = document.createElement("span");
  priorityBadge.className = "badge";
  priorityBadge.textContent = `Priority: ${todo.priority}`;
 
  metaRow.appendChild(priorityBadge);

  let deadline = document.createElement("small");
  deadline.textContent = `Deadline: ${todo.deadline}`;
  metaRow.appendChild(deadline);

  let status = document.createElement("span");
  status.className = "badge rounded-pill ms-2";
  status.textContent = todo.isChecked ? "Completed" : "Pending";
  status.style.backgroundColor = todo.isChecked ? "#28a745" : "#6c757d";
  metaRow.appendChild(status);
}

    for (let todo of todoList) {
      createAndAppendTodo(todo);
    }

