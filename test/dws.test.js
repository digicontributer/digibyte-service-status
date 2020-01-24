const nock = require('nock');
const dws = require('../lib/dws');

const SINGLE_URL = 'https://go.digibyte.io';

describe('DWS', () => {

  describe('getDWSStatus', () => {

    it('should should get a single dws instance', () => {
      dws.getDWSStatus(SINGLE_URL).then(response => {
        expect(response.status).toBe('finished');
      });
    });

    it('should should get all dws instances', () => {
      dws.getAllDWSStatus().then(response => {
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThanOrEqual(1);
      });
    });

  });
});