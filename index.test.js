const { createList, removeCompletedFromUI } = require('./src/addrem.js');
const { removeFromLocalStorage, clear, status } = require('./src/check.js');

beforeEach(() => {
  localStorage.setItem('task.list', JSON.stringify([]));
});

describe('addItem and remove item from localStorage', () => {
  test('addItem to localStorage', () => {
    const task = 'Read a book';
    const result = createList(task);
    const data = JSON.parse(localStorage.getItem('task.list')) || [];

    const expectedResult = {
      index: data.length + 1,
      description: task,
      completed: false,
    };

    expect(result).toEqual(expectedResult);
  });

  test('remove item from localStorage', () => {
    const dump = [
      {
        index: 1,
        description: 'hello',
        completed: false,
      },
      {
        index: 2,
        description: 'world',
        completed: false,
      },
      {
        index: 3,
        description: 'come',
        completed: false,
      },
    ];

    localStorage.setItem('task.list', JSON.stringify(dump));
    const result = [{
      index: 1,
      description: 'hello',
      completed: false,
    }];

    const storage = JSON.parse(localStorage.getItem('task.list'));
    expect(removeFromLocalStorage(0, storage)).toEqual(result);
  });
});

describe('editing, toggle status and clear completed task', () => {
  test('remove all task from list', () => {
    const ul = document.createElement('ul');
    ul.className = 'list-container';
    ul.innerHTML = `
        <li> Go to work </li>
        <li> Buy groceries </li>
      `;
    expect(clear(ul)).toBe(undefined);
  });

  test('toggle status of task', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;

    const data = {
      index: 1,
      description: 'hello',
      completed: false,
    };

    expect(status(input, data)).toBe(true);
  });

  test('remove one completed task from UI', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <ul>
        <div>
          <li>
           <input type='checkbox' class="check" checked />
          </li>
        </div>
        
        <div>
          <li>
           <input type="checkbox" class="check"/>
          </li>
        </div>
      </ul>
    `;
    document.body.appendChild(div);
    const temp = document.querySelectorAll('.check');

    expect(removeCompletedFromUI(temp)).toEqual(1);
  });
});