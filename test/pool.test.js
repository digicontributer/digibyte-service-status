const nock = require('nock');
const pool = require('../lib/pool');

const SINGLE_URL = 'http://digihash.co'

describe('Pool', () => {

  describe('getPoolStatus', () => {

    it('should should get a single pool instance', () => {
      pool.getPoolStatus(SINGLE_URL).then(response => {
        expect(response).toHaveProperty('time');
      });
    });

    it('should should get all pools', () => {
      pool.getAllPoolStatus().then(response => {
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThanOrEqual(1);
      });
    });

  });
});