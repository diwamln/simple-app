// tests/sanity.test.js
const request = require('supertest');
// UBAH DARI: const app = require('../server');
// KE:
const app = require('../app'); // <--- Ganti 'server' dengan 'app' (file yang hanya berisi Express instance)

describe('System Check', () => {
    it('GET / should return 200 OK', async () => {
        // Supertest sekarang menerima Express Application object yang benar
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
});
