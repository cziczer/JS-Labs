//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
const { expect } = require('chai');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
const { app, x, y } = require('../app2');

// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
});

describe('GET /', function() {
    it('calculate harcoded x and y', async () => {
    const response = await supertest(app)
       .get('/')
       .expect('Content-Type', /html/)
       .expect(200);

    expect(response.text).to.include('1 + 2 = 3');
    });
});

describe('GET /add/:x/:y', () => {
    it('x + y = x+y', async () => {
        const response = await supertest(app)
            .get('/add/7/11')
            .send()
            .expect('Content-Type', /html/)
            .expect(200);

        expect(response.text).to.include('7 + 11 = 18');
    });
});