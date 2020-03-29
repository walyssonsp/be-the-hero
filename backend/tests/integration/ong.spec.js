const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); //Zera o banco de DADOS
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    //.set('Authorization', 'algumIDvalido')
    .send({
      name: "APAD2",
      email: "contato@gmail.com",
      whatsapp: "11977742534",
      city: "Betim",
      uf: "MG"
    });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});