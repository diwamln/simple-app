// tests/app.test.js
const request = require('supertest');
const app = require('../app'); // Import objek app yang sudah dimodifikasi

describe('Application Endpoints', () => {

    it('GET / should return "Im Updating" and status 200', async () => {
        // Supertest akan membuat virtual server untuk menguji 'app'
        const res = await request(app).get('/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Im Updating');
    });
    
    it('POST /test should return data received and status 200', async () => {
        const testData = { item: 'value', id: 123 };
        
        const res = await request(app)
            .post('/test')
            .send(testData) // Kirim data JSON
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Data received');
        // Pastikan data yang dikirim sama dengan data yang diterima
        expect(res.body.yourData).toEqual(testData); 
    });
});
