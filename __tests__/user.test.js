import supertest from 'supertest';
import { config } from 'dotenv';
import createServer from '../createServer';
import mongoose from 'mongoose';
import connectDB from '../config/db';

const app = createServer();

describe('User', () => {
  beforeAll(async () => {
    config({ path: '.env.test' });
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('User routes', () => {
    describe('Given no auth token', () => {
      it('GET /api/users/profile should return 401', async () => {
        await supertest(app).get('/api/users/profile').expect(401);
      });

      it('PUT /api/users/profile should return 401', async () => {
        await supertest(app).put('/api/users/profile').expect(401);
      });

      it('DELETE /api/users/profile should return 401', async () => {
        await supertest(app).delete('/api/users/profile').expect(401);
      });
    });

    describe('Given invalid auth token', () => {
      it('GET /api/users/profile with invalid token should return 401', async () => {
        await supertest(app)
          .get('/api/users/profile')
          .set('Authorization', 'Bearer invalid_token')
          .expect(401);
      });
    });

    describe('Given user does not exist', () => {
      it('login route should return 401', async () => {
        await supertest(app)
          .post('/api/users/auth')
          .send({ email: 'abuka@email.com', password: 'test' })
          .expect(401);
      });
    });

    describe('Given invalid user input', () => {
      it('POST /api/users/register with missing email should return 400', async () => {
        await supertest(app)
          .post('/api/users/')
          .send({ password: 'test123' })
          .expect(400);
      });

      it('POST /api/users/auth with invalid email format should return 400', async () => {
        await supertest(app)
          .post('/api/users/auth')
          .send({ email: 'invalid_email', password: 'test123' })
          .expect(400);
      });
    });

    describe('Login rate limiting', () => {
      it('POST /api/users/auth with multiple failed attempts should return 429 (Too Many Requests)', async () => {
        // Simulate multiple failed login attempts (replace with actual logic)
        for (let i = 0; i < 5; i++) {
          await supertest(app)
            .post('/api/users/auth')
            .send({ email: 'user@email.com', password: 'wrongpassword' })
            .expect(401);
        }

        await supertest(app)
          .post('/api/users/auth')
          .send({ email: 'user@email.com', password: 'correctpassword' })
          .expect(429); // Expect rate limiting after exceeding attempts
      });
    });

    // describe('Given a valid token with insufficient permissions', () => {
    //   // Assuming a user with limited access
    //   let userToken;

    //   beforeEach(async () => {
    //     // Logic to obtain a limited user token
    //     userToken = await // ... obtain token
    //   });

    //   it('GET /api/users/all should return 403', async () => {
    //     await supertest(app).get('/api/users/all')
    //       .set('Authorization', `Bearer ${userToken}`)
    //       .expect(403); // Assuming /api/users/all requires admin privileges
    //   });

    //   it('DELETE /api/users/:userId should return 403 (unauthorized user)', async () => {
    //     await supertest(app).delete('/api/users/123') // Replace with another user's ID
    //       .set('Authorization', `Bearer ${userToken}`)
    //       .expect(403);
    //   });
    // });
  });
});
