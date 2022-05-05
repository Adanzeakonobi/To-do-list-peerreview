const { createList } = require('./src/addrem.js');
const { removeFromLocalStorage } = require('./src/check.js');

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
