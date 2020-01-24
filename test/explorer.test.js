const nock = require('nock');
const explorer = require('../lib/explorer');

const SINGLE_URL = 'https://digiexplorer.info'

describe('Explorer', () => {

  describe('getInsightStatus', () => {

    it('should should get a single explorer instance', () => {
      explorer.getInsightStatus(SINGLE_URL).then(response => {
        expect(response).toHaveProperty('startTs');
      });
    });

    it('should should get all explorers', () => {
      explorer.getAllInsightStatus().then(response => {
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should should get only fully synced explorers', () => {
      explorer.getFullySyncedExplorers().then(response => {
        expect(Array.isArray(response)).toBe(true);
        expect(response.filter(explorers => explorer.status !== 'finished')).toHaveLength(response.length);
      });
    });

  });
});