const request = require('supertest');
const app = require('../server'); 

describe('User Routes - POST /api/users/login', () => {
    it('should return 401 for incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' });
      
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  
    
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/protected-route'); 
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Not authorized, no token'); 
    });
});
