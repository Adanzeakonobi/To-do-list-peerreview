import './style.css';

const {
  status, todoList, save, clear,
} = require('./check.js');
const { createList, deleteList, deleteAllDone } = require('./addrem.js');

const container = document.querySelector('.list-container');
const newList = document.querySelector('.form');
const newBar = document.querySelector('.add-bar');
const refresh = document.querySelector('.fa-sync-alt');
const clearCompleted = document.querySelector('.clear');

const render = () => {
  clear(container);
  todoList.forEach((todo) => {
    const div = document.createElement('div');
    const listElement = document.createElement('li');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const icon = document.createElement('i');
    const dlt = document.createElement('i');
    const edit = document.createElement('input');

    input.type = 'checkbox';
    input.name = 'name';
    input.value = 'value';
    input.id = 'id';
    input.classList.add('cursor');
    input.classList.add('check');

    edit.type = 'text';
    edit.value = `${todo.description}`;
    edit.id = `${todo.index}`;
    edit.classList.add('grow');

    input.checked = todo.completed;
    input.addEventListener('change', () => {
      status(input, todo);
      save(todoList);
    });

    // listElement.dataset.listId = todo.index;
    div.classList.add('listcont-prop');
    listElement.classList.add('list-prop');
    span.classList.add('grow');
    span.innerHTML = `${todo.description}`;

    icon.classList.add('fas');
    icon.classList.add('fa-ellipsis-v');
    icon.classList.add('show-more');
    dlt.classList.add('fas');
    dlt.classList.add('fa-trash-alt');

    listElement.appendChild(input);
    listElement.appendChild(span);
    listElement.appendChild(icon);
    div.appendChild(listElement);
    container.appendChild(div);

    icon.addEventListener('click', () => {
      icon.replaceWith(dlt);
      span.replaceWith(edit);
    });
  });
};

refresh.addEventListener('click', () => {
  window.location.reload();
});

render();

const saveAndRender = () => {
  save();
  render();
};

newList.addEventListener('submit', (e) => {
  e.preventDefault();
  const listName = newBar.value;
  const list = createList(listName);
  newBar.value = null;
  todoList.push(list);
  saveAndRender();
});

container.addEventListener('click', deleteList);
clearCompleted.addEventListener('click', deleteAllDone);
