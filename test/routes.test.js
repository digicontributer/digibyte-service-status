const request = require('supertest');
const app = require('../index');

describe('Explorer Routes', () => {

  describe('GET Endpoints', () => {

    it('should get all explorers', async () => {
      const res = await request(app)
        .get('/v1/explorer');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should only get finished explorers', async () => {
      const res = await request(app)
        .get('/v1/explorer/ready');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.filter(i => i.status === 'finished')).toHaveLength(res.body.length);
    });

  });

});

describe('DWS Routes', () => {

  describe('GET Endpoints', () => {

    it('should get all DWS instances', async () => {
      const res = await request(app)
        .get('/v1/dws');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should only get ready DWS instances', async () => {
      const res = await request(app)
        .get('/v1/dws/ready');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.filter(i => i.status === 'finished')).toHaveLength(res.body.length);
    });

  });

});

describe('Pool Routes', () => {

  describe('GET Endpoints', () => {

    it('should get all Pool instances', async () => {
      const res = await request(app)
        .get('/v1/pool');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should only get ready Pool instances', async () => {
      const res = await request(app)
        .get('/v1/pool/ready');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.filter(i => i.status === 'finished')).toHaveLength(res.body.length);
    });

  });

});