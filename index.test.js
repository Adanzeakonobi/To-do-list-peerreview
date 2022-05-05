const { createList } = require('./src/addrem.js');

const getFromLocalStorage = () => JSON.parse(localStorage.getItem('task.list'));

describe('addItem', () => {
  test('addItem to localStorage', () => {
    const result = getFromLocalStorage();
    const data = result[result.length - 1];

    expect(createList('Read book')).toEqual(data);
  });
});
