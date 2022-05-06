const LIST_KEY = 'task.list';
const todoList = JSON.parse(localStorage.getItem(LIST_KEY)) || [];

const save = () => {
  localStorage.setItem(LIST_KEY, JSON.stringify(todoList));
};

const clear = (element) => {
  while (element.firstChild) element.removeChild(element.firstChild);
};

const status = (checkbox, task) => {
  if (checkbox.checked) {
    task.completed = true;
  } else {
    task.completed = false;
  }
};

const removeFromLocalStorage = (index, storage) => {
  const removedItem = storage.splice(index, 1);

  return removedItem;
};

const removeLocal = (todo) => {
  const todoIndex = todo.children[0].children[1].value;
  const index = todoList.indexOf(todoIndex);
  removeFromLocalStorage(index, todoList);
  save();
  // window.location.reload();
};

module.exports = {
  status, todoList, clear, LIST_KEY, removeLocal, save, removeFromLocalStorage,
};