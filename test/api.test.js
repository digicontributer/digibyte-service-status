const API = require('../lib/api');

const TEST_URL = 'https://jsonplaceholder.typicode.com/todos/1';

describe('API function', () => {
  it('should return a json response', () => {
    API.getRequest(TEST_URL).then(json => {
      expect(json).toHaveProperty('completed');
    })
  })
});