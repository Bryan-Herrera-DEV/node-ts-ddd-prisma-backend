import request from 'supertest';
import express from 'express';
import { register } from '@/main/providers/Routes/User.routes';

// Crear la aplicación express y agregar las rutas
const app = express();
const router = express.Router();
app.use(express.json());
register(router);
app.use(router);

describe('POST /register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        name: 'Test',
        lastname: 'User'
      });

    expect(response.status).toBe(201); // Espera un estado HTTP 201 (CREATED)
    expect(response.body.message).toEqual('User created');
  });

  it('should fail to register a new user with invalid email', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'invalid email',
        name: 'Test',
        lastname: 'User'
      });

    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
    expect(response.body.errors[0].msg).toEqual('Must be a valid email');
  });
});
