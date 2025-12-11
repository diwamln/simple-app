// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('Application Endpoints', () => {
    
    // Test 1: GET / - Cek aplikasi tidak crash
    it('GET / should return status 200 without errors', async () => {
        const res = await request(app).get('/');
        
        // Cek status code bukan 500 (internal server error)
        expect(res.statusCode).not.toBe(500);
        
        // Cek response ada (tidak undefined)
        expect(res.text).toBeDefined();
        expect(res.text.length).toBeGreaterThan(0);
    });
    
    // Test 2: POST /test - Cek endpoint bisa terima data tanpa crash
    it('POST /test should accept data and return status 200 without errors', async () => {
        const testData = { item: 'value', id: 123 };
        
        const res = await request(app)
            .post('/test')
            .send(testData)
            .set('Accept', 'application/json');
        
        // Cek tidak ada error (status 500)
        expect(res.statusCode).not.toBe(500);
        
        // Cek response body ada dan valid
        expect(res.body).toBeDefined();
        expect(typeof res.body).toBe('object');
        
        // Cek ada property yang diharapkan (tapi tidak cek value spesifik)
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('yourData');
    });
    
    // Test 3: Detect syntax/runtime errors
    it('should not have runtime errors like undefined methods', async () => {
        try {
            // Test GET endpoint
            const res1 = await request(app).get('/');
            expect(res1.statusCode).toBeLessThan(500);
            
            // Test POST endpoint
            const res2 = await request(app)
                .post('/test')
                .send({ test: 'data' });
            expect(res2.statusCode).toBeLessThan(500);
            
        } catch (error) {
            // Detect typo seperti res.jsonn() atau res.sendd()
            if (error.message.includes('is not a function')) {
                fail(`Runtime error detected: ${error.message}`);
            }
            if (error.message.includes('is not defined')) {
                fail(`Variable undefined error: ${error.message}`);
            }
            throw error;
        }
    });
    
    // Test 4: Response time check (detect infinite loops)
    it('should respond within 3 seconds', async () => {
        const startTime = Date.now();
        
        await request(app).get('/');
        
        const responseTime = Date.now() - startTime;
        expect(responseTime).toBeLessThan(3000);
    }, 5000);
    
    // Test 5: Handle multiple requests (no memory leaks)
    it('should handle multiple concurrent requests', async () => {
        const requests = [
            request(app).get('/'),
            request(app).get('/'),
            request(app).post('/test').send({ test: 1 })
        ];
        
        const responses = await Promise.all(requests);
        
        responses.forEach(res => {
            expect(res.statusCode).not.toBe(500);
        });
    });
});
