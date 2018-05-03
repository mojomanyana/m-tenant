import AWS_MOCK from 'aws-sdk-mock';
import assert from 'assert';
import { expect } from 'chai';
import {
  getAll,
  getSingle,
} from '../src/index';

const eventEmpty = { body: '{}' };
const eventInvalid = { body: {} };
const context = {};

describe('Test tenant lambda functions', () => {
  before(() => {
    AWS_MOCK.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      callback(null, { Items: [{ name: 'Test 1', tenantId: 'tenantId1' }, { name: 'Test 2', tenantId: 'tenantId2' }] });
    });

    AWS_MOCK.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: { name: 'Test 1', tenantId: 'tenantId1', userId: 'userId1' } });
    });
  });

  it('getAll() => should return 2 tenants and undefined lastEvaluatedKey', (done) => {
    getAll(eventEmpty, context, (err, response) => {
      const data = JSON.parse(response.body);
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(200);
      expect(data.lastEvaluatedKey).to.equal(undefined);
      assert.equal(data.tenants.length, 2);
      assert.equal(data.tenants[0].name, 'Test 1');
      assert.equal(data.tenants[1].name, 'Test 2');
      done();
    });
  });

  it('getAll() => should return error for invalid body', (done) => {
    getAll(eventInvalid, context, (err, response) => {
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  it('getSingle() => should return solo tenant details', (done) => {
    eventEmpty.pathParameters = {
      tenantId: 'tenantId1',
      userId: 'userId1',
    };
    getSingle(eventEmpty, context, (err, response) => {
      const data = JSON.parse(response.body);
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(200);
      assert.equal(data.tenant.name, 'Test 1');
      assert.equal(data.tenant.tenantId, 'tenantId1');
      assert.equal(data.tenant.userId, 'userId1');
      done();
    });
  });

  it('should return error for invalid body', (done) => {
    getSingle(eventInvalid, context, (err, response) => {
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  after(() => AWS_MOCK.restore());
});
