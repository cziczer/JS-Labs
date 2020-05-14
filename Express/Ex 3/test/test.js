var supertest = require("supertest");
const { expect } = require('chai');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
const { app } = require('../index');
var chai = require('chai');
chai.use(require('chai-json'));
const operations = require('../Operations')

describe('Json tests', function() {
    // it('json file', async () => {
    //     expect(require('../Operation')).to.be.a.jsonFile();
    //     });
    it('operation with id 1', async () => {
    operation = operations.filter(member => member.id === 1)[0];
    expect(operation.operator).to.include('*');
    });
    it('operation add', async () => {
    operation = operations.filter(member => member.id === 2)[0];
    expect(operation.operator).to.include('+');
    });
    it('operation subtract', async () => {
        operation = operations.filter(member => member.id === 3)[0];
        expect(operation.operator).to.include('-');
        });
});



describe('GET /add', function() {
    it('add call', async () => {
    const response = await supertest(app)
       .get('/add')
       .expect('Content-Type', /html/)
       .expect(200);

    expect(response.text).to.include('43 + 12 = 55');
    });
});

describe('GET /multiply', function() {
    it('multiply call', async () => {
    const response = await supertest(app)
       .get('/multiply')
       .expect('Content-Type', /html/)
       .expect(200);

    expect(response.text).to.include('4 * 1 = 4');
    });
});

describe('GET /subtract', function() {
    it('subtract call', async () => {
    const response = await supertest(app)
       .get('/subtract')
       .expect('Content-Type', /html/)
       .expect(200);

    expect(response.text).to.include('86 - 23 = 63');
    });
});

describe('GET /division', function() {
    it('division call', async () => {
    const response = await supertest(app)
       .get('/division')
       .expect('Content-Type', /html/)
       .expect(200);

    expect(response.text).to.include('36 / 6 = 6');
    });
});