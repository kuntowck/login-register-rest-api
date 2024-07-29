import supertest from "supertest";
import {
  createTestUser,
  removeTestUser,
  removeAllTestContacts,
} from "./test-util.js";
import {web} from '../src/app/web.js';

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new object', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        phone: '08123456789'
      })

    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.firstName).toBe('test')
    expect(result.body.data.lastName).toBe('test')
    expect(result.body.data.email).toBe('test@gmail.com')
    expect(result.body.data.phone).toBe('08123456789')
  });

  it('should can create new object', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: '',
        lastName: 'test',
        email: 'test@gmail.com',
        phone: '0812345678912111111111111111111111111111111'
      })

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  });
  
});
